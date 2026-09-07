"use client";

import React, { useState } from "react";
import { Issue } from "@/lib/mock-data";
import { MapPin, CheckCircle, Users, ThumbsUp, Share2, MoreVertical, X, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import IssueTimeline from "@/components/IssueTimeline";

interface RightPanelProps {
  issue: Issue;
  isOpen: boolean;
  onClose: () => void;
}

export default function RightPanel({ issue, isOpen, onClose }: RightPanelProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [upvotes, setUpvotes] = useState(issue?.supportCount || 0);

  // Sync upvotes when issue changes
  React.useEffect(() => {
    if (issue) {
      setUpvotes(issue.supportCount);
      setCurrentImageIndex(0);
    }
  }, [issue]);

  const handleUpvote = () => {
    setUpvotes((prev) => prev + 1);
  };

  const nextImage = () => {
    if (issue && issue.images && issue.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % issue.images.length);
    }
  };

  const prevImage = () => {
    if (issue && issue.images && issue.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + issue.images.length) % issue.images.length);
    }
  };

  if (!issue) return null;

  return (
    <div
      className={`fixed right-0 top-16 h-[calc(100vh-64px)] w-[400px] bg-white border-l border-[#D7DADE] shadow-[0_8px_30px_rgba(41,59,70,0.08)] z-20 overflow-y-auto transition-transform duration-200 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-5">
        <div className="relative group h-[200px] w-full rounded-xl overflow-hidden">
          <img
            src={issue.images?.[currentImageIndex] || issue.images?.[0] || "https://placehold.co/400x200"}
            alt={issue.title}
            className="w-full h-full object-cover"
          />
          {/* Badges and overlays */}
          <div className="absolute top-3 left-3">
            <span
              className={`px-2 py-1 rounded-md text-xs font-medium ${
                issue.status === "verified" || issue.status === "resolved"
                  ? "bg-[#EAF7ED] text-[#328B46]"
                  : "bg-[#FFF4E5] text-[#A66300]"
              }`}
            >
              {issue.status.charAt(0).toUpperCase() + issue.status.slice(1).replace("_", " ")}
            </span>
          </div>
          
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <span className="bg-black/50 text-white rounded-md px-2 py-1 text-xs">
              {currentImageIndex + 1}/{issue.images?.length || 1}
            </span>
            <button
              onClick={onClose}
              className="bg-white/90 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white transition-colors"
            >
              <X size={16} className="text-[#293B46]" />
            </button>
          </div>

          {issue.images && issue.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold text-[#293B46]">{issue.title}</h2>
          <div className="mt-2 flex items-center gap-1 text-sm text-[#7A7A7A]">
            <MapPin size={14} className="text-[#7A7A7A]" />
            <span>{issue.area ? `${issue.area}, ${issue.city}` : issue.location}</span>
          </div>
          <div className="mt-1 text-sm text-[#7A7A7A]">
            {issue.distance} · Reported {issue.timeAgo || "2h ago"}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          {issue.status === "verified" && (
            <div className="bg-[#EAF7ED] text-[#328B46] rounded-full px-2.5 py-1 text-xs font-medium flex items-center gap-1">
              <CheckCircle size={12} />
              <span>Verified</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-xs text-[#7A7A7A]">
            <Users size={14} />
            <span>{upvotes} people confirmed</span>
          </div>
          {issue.priority === "high" && (
            <div className="text-xs text-[#C9473F] font-medium">🔥 High priority</div>
          )}
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleUpvote}
            className="flex-1 h-11 rounded-md bg-[#55B360] hover:bg-[#4AA053] text-white font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <ThumbsUp size={18} />
            <span>Upvote ({upvotes})</span>
          </button>
          <button className="flex-1 h-11 rounded-md bg-white hover:bg-gray-50 border border-[#D7DADE] text-[#293B46] font-medium flex items-center justify-center gap-2 transition-colors">
            <Share2 size={18} />
            <span>Share</span>
          </button>
          <button className="w-11 h-11 rounded-md bg-white hover:bg-gray-50 border border-[#D7DADE] flex items-center justify-center transition-colors">
            <MoreVertical size={18} className="text-[#293B46]" />
          </button>
        </div>

        <div className="mt-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-[#293B46]">Status</h3>
            <button className="text-sm text-[#55B360] font-medium cursor-pointer hover:underline">
              View timeline →
            </button>
          </div>
          <IssueTimeline steps={issue.timeline || [
            { status: "reported", label: "Reported", completed: true, timestamp: "Today, 10:00 AM" },
            { status: "verified", label: "Verified by AI", completed: true, timestamp: "Today, 10:05 AM" },
            { status: "in_progress", label: "In Progress", completed: false },
            { status: "resolved", label: "Resolved", completed: false }
          ]} />
        </div>

        <div className="mt-5 flex gap-4 pt-5 border-t border-[#D7DADE]">
          <div>
            <div className="flex items-center gap-1 text-xs text-[#7A7A7A] mb-1">
              <span>Category</span>
            </div>
            <div className="text-sm font-medium text-[#293B46]">
              {issue.categoryLabel || issue.category}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1 text-xs text-[#7A7A7A] mb-1">
              <FileText size={12} />
              <span>Issue ID</span>
            </div>
            <div className="text-sm font-medium text-[#293B46]">
              {issue.id.startsWith("#") ? issue.id : `#${issue.id}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
