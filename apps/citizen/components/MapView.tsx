'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Issue, mockClusters, userLocation, mapCenter, mapZoom } from '@/lib/mock-data';
import { MapControls } from './MapControls';
import { IssuePreviewCard } from './IssuePreviewCard';
import { MapPin } from 'lucide-react';

interface MapViewProps {
  issues: Issue[];
  activeFilter: string;
  selectedIssueId: string | null;
  onIssueSelect: (issue: Issue) => void;
  onMapClick: () => void;
}

export function MapView({
  issues,
  activeFilter,
  selectedIssueId,
  onIssueSelect,
  onMapClick,
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isSatellite, setIsSatellite] = useState(false);
  const markersRef = useRef<{ [key: string]: maplibregl.Marker }>({});

  const stadiaApiKey = process.env.NEXT_PUBLIC_STADIA_API_KEY || 'b6777717-81e7-40dd-95c8-e03afeb0a829';

  const getMapStyle = useCallback((satellite: boolean) => {
    return satellite
      ? `https://tiles.stadiamaps.com/styles/alidade_satellite.json?api_key=${stadiaApiKey}`
      : `https://tiles.stadiamaps.com/styles/alidade_smooth.json?api_key=${stadiaApiKey}`;
  }, [stadiaApiKey]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    try {
      const mapInstance = new maplibregl.Map({
        container: mapContainer.current,
        style: getMapStyle(isSatellite),
        center: [mapCenter[0], mapCenter[1]],
        zoom: mapZoom,
        attributionControl: false,
      });

      mapInstance.on('load', () => {
        setMapLoaded(true);
      });

      mapInstance.on('click', () => {
        onMapClick();
      });

      map.current = mapInstance;
    } catch (e) {
      console.warn('MapLibre initialization error:', e);
      setMapLoaded(true);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [getMapStyle, isSatellite, onMapClick]);

  // Toggle satellite style
  const toggleSatellite = () => {
    const nextSatellite = !isSatellite;
    setIsSatellite(nextSatellite);
    if (map.current) {
      map.current.setStyle(getMapStyle(nextSatellite));
    }
  };

  // Update markers
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    // 1. Add User Location Marker (Blue pulsing dot)
    if (userLocation) {
      const el = document.createElement('div');
      el.className = 'relative flex items-center justify-center';
      el.innerHTML = `
        <div class="absolute w-8 h-8 rounded-full bg-blue-400/30 animate-pulse-ring"></div>
        <div class="relative w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-md"></div>
      `;

      const userMarker = new maplibregl.Marker({ element: el })
        .setLngLat(userLocation as [number, number])
        .addTo(map.current);

      markersRef.current['user-loc'] = userMarker;
    }

    // 2. Add Cluster Markers
    mockClusters.forEach((cluster) => {
      const el = document.createElement('div');
      const size = cluster.count >= 10 ? 'w-11 h-11 text-base' : 'w-9 h-9 text-sm';
      el.className = `${size} rounded-full bg-[#237A4B] text-white font-bold flex items-center justify-center shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform select-none z-10`;
      el.innerText = String(cluster.count);

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        map.current?.flyTo({ center: cluster.coordinates, zoom: (map.current.getZoom() || 12) + 1.5 });
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(cluster.coordinates)
        .addTo(map.current!);

      markersRef.current[`cluster-${cluster.id}`] = marker;
    });

    // 3. Filter issues based on activeFilter
    const filteredIssues = issues.filter((issue) => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'potholes') return issue.category === 'pothole';
      if (activeFilter === 'garbage') return issue.category === 'garbage';
      if (activeFilter === 'streetlights') return issue.category === 'streetlight';
      if (activeFilter === 'water') return issue.category === 'water';
      return issue.status === activeFilter;
    });

    // 4. Add Issue Pin Markers
    filteredIssues.forEach((issue) => {
      const isSelected = issue.id === selectedIssueId;
      const el = document.createElement('div');
      el.className = `cursor-pointer transition-transform hover:scale-115 z-20 ${isSelected ? 'scale-125 z-30' : ''}`;

      let pinColor = '#E53E3E'; // Red default
      let iconSvg = '!';

      if (issue.status === 'resolved') {
        pinColor = '#237A4B';
        iconSvg = '✓';
      } else if (issue.category === 'garbage') {
        pinColor = '#DD6B20';
        iconSvg = '🗑';
      } else if (issue.category === 'water') {
        pinColor = '#3182CE';
        iconSvg = '💧';
      } else if (issue.category === 'streetlight') {
        pinColor = '#D69E2E';
        iconSvg = '⚡';
      } else if (issue.status === 'in_progress') {
        pinColor = '#DD6B20';
        iconSvg = '⚙';
      }

      // Teardrop pin SVG
      el.innerHTML = `
        <div style="filter: drop-shadow(0 3px 6px rgba(0,0,0,0.25));" class="flex flex-col items-center">
          <div style="background-color: ${pinColor}; width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 2px solid #ffffff;">
            <span style="transform: rotate(45deg); color: #ffffff; font-weight: 700; font-size: 13px; line-height: 1;">${iconSvg}</span>
          </div>
        </div>
      `;

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        onIssueSelect(issue);
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(issue.coordinates as [number, number])
        .addTo(map.current!);

      markersRef.current[issue.id] = marker;
    });
  }, [issues, activeFilter, selectedIssueId, mapLoaded, onIssueSelect]);

  const handleZoomIn = () => map.current?.zoomIn();
  const handleZoomOut = () => map.current?.zoomOut();
  const handleLocate = () => {
    if (map.current && userLocation) {
      map.current.flyTo({ center: userLocation as [number, number], zoom: 14 });
    }
  };
  const handleCompass = () => map.current?.resetNorth();
  const handleLayers = () => toggleSatellite();

  const activeSelectedIssue = issues.find((i) => i.id === selectedIssueId) || (selectedIssueId ? null : issues[0]);

  return (
    <div className="relative w-full h-[calc(100vh-64px)] mt-16 bg-[#F7F8F5] overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0 z-0" />

      {/* Floating Map Controls */}
      <MapControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onLocate={handleLocate}
        onCompass={handleCompass}
        onLayers={handleLayers}
      />

      {/* Floating Issue Preview Card */}
      {activeSelectedIssue && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:top-8 md:right-[420px] lg:left-[560px] z-20 pointer-events-auto">
          <IssuePreviewCard
            issue={activeSelectedIssue}
            onViewDetails={onIssueSelect}
            onClose={onMapClick}
          />
        </div>
      )}

      {/* Bottom Right: Location Badge & Satellite Toggle */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-[#D7DADE] text-xs font-medium text-[#293B46] shadow-sm">
          <MapPin size={13} className="text-[#55B360]" />
          <span>Bengaluru, Karnataka</span>
        </div>

        {/* Satellite Toggle Button */}
        <button
          onClick={toggleSatellite}
          className="relative w-14 h-14 rounded-xl overflow-hidden border-2 border-white shadow-md transition-transform hover:scale-105 active:scale-95 group focus:outline-none"
          title="Toggle Satellite"
        >
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=150&h=150&fit=crop"
            alt="Satellite"
            className="w-full h-full object-cover"
          />
          <span className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[10px] font-medium py-0.5 text-center group-hover:bg-black/80 transition-colors">
            {isSatellite ? 'Streets' : 'Satellite'}
          </span>
        </button>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.8; }
          70% { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(0.95); opacity: 0; }
        }
      `,
        }}
      />
    </div>
  );
}
