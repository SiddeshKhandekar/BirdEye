"use client";

import React, { useState } from "react";
import { X, Camera, MapPin, CheckCircle } from "lucide-react";

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportIssueModal({ isOpen, onClose }: ReportIssueModalProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  if (!isOpen) return null;

  const handleUploadClick = () => {
    // Simulate file upload
    setImagePreview("https://placehold.co/400x300");
  };

  const handleSubmit = () => {
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setImagePreview(null);
        onClose();
      }, 2000);
    }, 1500);
  };

  const handleClose = () => {
    if (status !== "loading") {
      setStatus("idle");
      setImagePreview(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(41,59,70,0.12)] max-w-[480px] w-full max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="px-6 py-4 border-b border-[#D7DADE] flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold text-[#293B46]">Report an Issue</h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X size={20} className="text-[#7A7A7A]" />
          </button>
        </div>

        {status === "idle" && (
          <>
            <div className="p-6 flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-[#293B46] mb-2">Photo</label>
                <div
                  onClick={handleUploadClick}
                  className="h-[160px] rounded-lg border-2 border-dashed border-[#D7DADE] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Camera size={32} className="text-[#969696] mb-2" />
                      <span className="text-sm font-medium text-[#293B46]">Upload a photo</span>
                      <span className="text-xs text-[#7A7A7A] mt-1">JPG, PNG up to 10MB</span>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#293B46] mb-2">Category</label>
                <select className="w-full h-11 rounded-md border border-[#D7DADE] px-3 text-[#293B46] bg-white outline-none focus:border-[#55B360]">
                  <option value="">Select a category</option>
                  <option value="pothole">Pothole</option>
                  <option value="garbage">Garbage</option>
                  <option value="streetlight">Streetlight</option>
                  <option value="water">Water</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#293B46] mb-2">Description</label>
                <textarea
                  placeholder="Describe the issue..."
                  className="w-full h-[100px] rounded-md border border-[#D7DADE] p-3 resize-none text-[#293B46] outline-none focus:border-[#55B360]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#293B46] mb-2">Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <MapPin size={16} className="text-[#7A7A7A]" />
                  </div>
                  <input
                    type="text"
                    value="Current location — Koramangala, Bengaluru"
                    readOnly
                    className="w-full h-11 rounded-md border border-[#D7DADE] pl-9 pr-3 text-sm text-[#293B46] bg-gray-50 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#D7DADE] flex gap-3 sticky bottom-0 bg-white">
              <button
                onClick={handleClose}
                className="flex-1 h-11 rounded-md border border-[#D7DADE] text-[#293B46] font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 h-11 rounded-md bg-[#55B360] text-white font-semibold hover:bg-[#4AA053] transition-colors"
              >
                Submit Report
              </button>
            </div>
          </>
        )}

        {status === "loading" && (
          <div className="p-12 flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-4 border-[#EEF8F0] border-t-[#55B360] rounded-full animate-spin" />
            <div className="text-[#293B46] font-medium">Verifying with AI...</div>
          </div>
        )}

        {status === "success" && (
          <div className="p-12 flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#EAF7ED] flex items-center justify-center">
              <CheckCircle size={24} className="text-[#328B46]" />
            </div>
            <div className="text-lg font-bold text-[#293B46]">Issue reported successfully!</div>
          </div>
        )}
      </div>
    </div>
  );
}
