'use client';

import { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { supabase } from '@/lib/supabase';

// Fix Leaflet default icon issue in Next.js/Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Category colors for markers
const CATEGORY_COLORS: Record<string, string> = {
    pothole: '#E53935',
    garbage: '#F59E0B',
    streetlights: '#8B5CF6',
    water: '#3B82F6',
    other: '#6b7c85',
};

// Create a colored circle marker icon
function createCategoryIcon(category: string) {
    const color = CATEGORY_COLORS[category] || CATEGORY_COLORS.other;
    return L.divIcon({
        className: '',
        html: `<div style="
      width: 28px; height: 28px;
      background: ${color};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    "></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14],
    });
}

// Auto-center map on user's geolocation
function LocationFinder() {
    const map = useMap();
    useEffect(() => {
        map.locate({ setView: true, maxZoom: 15 });
    }, [map]);
    return null;
}

interface Issue {
    id: string;
    title: string;
    category: string;
    status: string;
    severity: string;
    latitude: number;
    longitude: number;
    address_text: string;
    photo_urls: string[];
    support_count: number;
    is_anonymous: boolean;
    created_at: string;
}

interface MapCanvasProps {
    activeFilter: string;
    onIssueCountChange: (counts: { total: number; pothole: number; garbage: number; streetlights: number; water: number; other: number }) => void;
}

export default function MapCanvas({ activeFilter, onIssueCountChange }: MapCanvasProps) {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [userPos, setUserPos] = useState<[number, number]>([12.9716, 77.5946]); // Default: Bengaluru

    // Fetch issues from Supabase
    useEffect(() => {
        async function fetchIssues() {
            // We store lat/lng as separate floats (Supabase Cloud doesn't have PostGIS usually)
            // For the MVP, we read latitude, longitude directly
            const { data, error } = await supabase
                .from('issues')
                .select('*')
                .order('created_at', { ascending: false });

            if (data) {
                // Map the Supabase row to our Issue interface
                const mapped: Issue[] = data.map((row: any) => ({
                    id: row.id,
                    title: row.title,
                    category: row.category,
                    status: row.status,
                    severity: row.severity,
                    latitude: row.latitude ?? 0,
                    longitude: row.longitude ?? 0,
                    address_text: row.address_text,
                    photo_urls: row.photo_urls ?? [],
                    support_count: row.support_count ?? 1,
                    is_anonymous: row.is_anonymous ?? false,
                    created_at: row.created_at,
                }));
                setIssues(mapped);

                // Count by category
                const counts = { total: mapped.length, pothole: 0, garbage: 0, streetlights: 0, water: 0, other: 0 };
                mapped.forEach((issue) => {
                    if (issue.category in counts) {
                        (counts as any)[issue.category]++;
                    } else {
                        counts.other++;
                    }
                });
                onIssueCountChange(counts);
            }
        }

        fetchIssues();
    }, []);

    // Filter issues by active category
    const filteredIssues = activeFilter === 'all'
        ? issues
        : issues.filter((i) => i.category === activeFilter);

    // Format time ago
    function timeAgo(dateStr: string) {
        const diffMs = Date.now() - new Date(dateStr).getTime();
        const hours = Math.floor(diffMs / 3600000);
        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    }

    return (
        <MapContainer
            center={userPos}
            zoom={14}
            scrollWheelZoom={true}
            style={{ width: '100%', height: '100%' }}
            zoomControl={false}
        >
            {/* Stadia Maps Tile Layer */}
            <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>'
                url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${process.env.NEXT_PUBLIC_STADIA_MAPS_API_KEY || ''}`}
            />

            {/* Auto-locate user */}
            <LocationFinder />

            {/* Zoom control on right side */}
            <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 500 }}>
                {/* Custom zoom handled by Leaflet internally */}
            </div>

            {/* Issue Markers */}
            {filteredIssues.map((issue) => (
                <Marker
                    key={issue.id}
                    position={[issue.latitude, issue.longitude]}
                    icon={createCategoryIcon(issue.category)}
                >
                    <Popup className="issue-popup">
                        <div className="popup-inner">
                            {issue.photo_urls?.[0] && (
                                <img
                                    src={issue.photo_urls[0]}
                                    alt={issue.title}
                                    className="popup-thumb"
                                />
                            )}
                            <div className="popup-info">
                                <h4>{issue.title}</h4>
                                <p>{issue.address_text}</p>
                                <p>{timeAgo(issue.created_at)}</p>
                                {issue.status === 'verified' && (
                                    <span className="verified-badge">✅ Verified</span>
                                )}
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
