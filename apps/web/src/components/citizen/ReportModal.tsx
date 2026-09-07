'use client';

import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';

const CATEGORIES = [
    { key: 'pothole', label: 'Pothole', icon: '🕳️' },
    { key: 'garbage', label: 'Garbage', icon: '🗑️' },
    { key: 'streetlights', label: 'Streetlights', icon: '💡' },
    { key: 'water', label: 'Water', icon: '💧' },
];

interface ReportModalProps {
    onClose: () => void;
}

export default function ReportModal({ onClose }: ReportModalProps) {
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const canSubmit = category && title && photoFile && !isSubmitting;

    async function handleSubmit() {
        if (!canSubmit) return;
        setIsSubmitting(true);

        try {
            // 1. Get user location
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
            });

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            // 2. Upload photo to Supabase Storage
            const fileExt = photoFile.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from('issue-photos')
                .upload(fileName, photoFile, { cacheControl: '3600', upsert: false });

            let photoUrl = '';
            if (uploadData) {
                const { data: urlData } = supabase.storage.from('issue-photos').getPublicUrl(fileName);
                photoUrl = urlData.publicUrl;
            }

            // 3. Generate issue ID (e.g., BE-2024-1837)
            const year = new Date().getFullYear();
            const seq = Math.floor(Math.random() * 9000) + 1000;
            const issueId = `BE-${year}-${seq}`;

            // 4. Reverse geocode for address (using Nominatim — free)
            let address = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
            try {
                const geocodeRes = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                );
                const geocodeData = await geocodeRes.json();
                if (geocodeData.display_name) {
                    address = geocodeData.display_name;
                }
            } catch {
                // Keep coordinate-based address if geocoding fails
            }

            // 5. Insert issue into Supabase
            const { error: insertError } = await supabase.from('issues').insert({
                id: issueId,
                title,
                description: description || null,
                category,
                status: 'reported',
                severity: 'medium',
                latitude: lat,
                longitude: lng,
                address_text: address,
                photo_urls: photoUrl ? [photoUrl] : [],
                is_anonymous: isAnonymous,
                support_count: 1,
            });

            if (insertError) {
                console.error('Insert error:', insertError);
                alert('Failed to submit report. Please try again.');
            } else {
                setSubmitted(true);
                setTimeout(() => onClose(), 1500);
            }
        } catch (err) {
            console.error('Submit error:', err);
            alert('Could not get your location. Please enable GPS and try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-card">
                <div className="modal-header">
                    <h2>{submitted ? '✅ Report Submitted!' : 'Report an Issue'}</h2>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>

                {submitted ? (
                    <div className="modal-body" style={{ textAlign: 'center', padding: '40px 24px' }}>
                        <p style={{ fontSize: 16, color: '#55B360', fontWeight: 600 }}>
                            Your report has been submitted successfully!<br />
                            Our AI will verify it shortly.
                        </p>
                    </div>
                ) : (
                    <div className="modal-body">
                        {/* Category Selection */}
                        <div className="form-group">
                            <label>Category *</label>
                            <div className="category-grid">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat.key}
                                        className={`category-btn ${category === cat.key ? 'selected' : ''}`}
                                        onClick={() => setCategory(cat.key)}
                                        type="button"
                                    >
                                        <span>{cat.icon}</span>
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Title */}
                        <div className="form-group">
                            <label>Title *</label>
                            <input
                                className="form-input"
                                type="text"
                                placeholder="e.g., Large pothole near park entrance"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength={150}
                            />
                        </div>

                        {/* Description */}
                        <div className="form-group">
                            <label>Description (optional)</label>
                            <textarea
                                className="form-input form-textarea"
                                placeholder="Any additional details..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {/* Photo Upload */}
                        <div className="form-group">
                            <label>📷 Upload Photo *</label>
                            <div
                                className={`photo-upload ${photoFile ? 'has-file' : ''}`}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {photoFile ? `✅ ${photoFile.name}` : 'Tap or drag to upload a photo'}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                capture="environment"
                                hidden
                                onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                            />
                        </div>

                        {/* Anonymity Shield */}
                        <div className="anon-toggle">
                            <input
                                type="checkbox"
                                checked={isAnonymous}
                                onChange={(e) => setIsAnonymous(e.target.checked)}
                                id="anon-checkbox"
                            />
                            <div className="anon-text">
                                <strong>Anonymous Reporting</strong>
                                <span>Hides your identity from municipal authorities</span>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            className="submit-btn"
                            disabled={!canSubmit}
                            onClick={handleSubmit}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Report'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
