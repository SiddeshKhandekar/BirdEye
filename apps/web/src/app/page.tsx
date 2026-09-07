'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import MapCanvas to avoid SSR issues with Leaflet
const MapCanvas = dynamic(() => import('@/components/map/MapCanvas'), { ssr: false });

import ReportModal from '@/components/citizen/ReportModal';

const CATEGORIES = [
  { key: 'all', label: 'All', color: '#55B360' },
  { key: 'pothole', label: 'Potholes', color: '#E53935', icon: '🕳️' },
  { key: 'garbage', label: 'Garbage', color: '#F59E0B', icon: '🗑️' },
  { key: 'streetlights', label: 'Streetlights', color: '#8B5CF6', icon: '💡' },
  { key: 'water', label: 'Water', color: '#3B82F6', icon: '💧' },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showReportModal, setShowReportModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [issueCount, setIssueCount] = useState({ total: 0, pothole: 0, garbage: 0, streetlights: 0, water: 0, other: 0 });

  return (
    <main className="map-container">
      {/* --- Floating Search Bar --- */}
      <div className="search-bar">
        <svg width="18" height="18" fill="none" stroke="#6b7c85" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search for location, area or issue..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* --- Category Filter Chips --- */}
      <div className="filter-chips">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            className={`chip ${activeFilter === cat.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat.key)}
          >
            {cat.icon && <span>{cat.icon}</span>}
            {cat.label}
          </button>
        ))}
      </div>

      {/* --- Report Issue Button --- */}
      <button className="report-btn" onClick={() => setShowReportModal(true)}>
        <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14" />
        </svg>
        Report Issue
      </button>

      {/* --- Full-Screen Map --- */}
      <MapCanvas
        activeFilter={activeFilter}
        onIssueCountChange={setIssueCount}
      />

      {/* --- Nearby Issues Bottom Bar --- */}
      <div className="nearby-bar">
        <span className="count">{issueCount.total} issues nearby</span>
        <div className="categories">
          <span className="cat-item"><span className="dot" style={{ background: '#E53935' }}></span> Potholes {issueCount.pothole}</span>
          <span className="cat-item"><span className="dot" style={{ background: '#F59E0B' }}></span> Garbage {issueCount.garbage}</span>
          <span className="cat-item"><span className="dot" style={{ background: '#8B5CF6' }}></span> Lights {issueCount.streetlights}</span>
          <span className="cat-item"><span className="dot" style={{ background: '#6b7c85' }}></span> Other {issueCount.other}</span>
        </div>
        <svg width="16" height="16" fill="none" stroke="#6b7c85" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
      </div>

      {/* --- Report Modal --- */}
      {showReportModal && (
        <ReportModal onClose={() => setShowReportModal(false)} />
      )}
    </main>
  );
}
