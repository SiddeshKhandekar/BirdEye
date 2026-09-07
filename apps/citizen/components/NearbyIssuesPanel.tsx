"use client";

import React from "react";
import { Issue } from "@/lib/mock-data";
import { Menu, X, ThumbsUp } from "lucide-react";

interface NearbyIssuesPanelProps {
  issues: Issue[];
  isOpen: boolean;
  onClose: () => void;
  onIssueSelect: (issue: Issue) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function NearbyIssuesPanel({
  issues,
  isOpen,
  onClose,
  onIssueSelect,
  activeFilter,
  onFilterChange,
}: NearbyIssuesPanelProps) {
  const tabs = [
    { id: "all", label: "All" },
    { id: "potholes", label: "Potholes 5" },
    { id: "garbage", label: "Garbage 3" },
    { id: "lights", label: "Lights 2" },
    { id: "others", label: "Others 2" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "reported":
        return "#E53E3E";
      case "in_progress":
        return "#ED8936";
      case "resolved":
      case "verified":
        return "#55B360";
      default:
        return "#7A7A7A";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ");
  };

  return (
    <div
      className={`fixed right-0 top-16 h-[calc(100vh-64px)] w-[400px] bg-white border-l border-[#D7DADE] shadow-[0_8px_30px_rgba(41,59,70,0.08)] z-20 overflow-y-auto transition-transform duration-200 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-5 pb-0 flex items-center">
        <button className="p-2 -ml-2 rounded-md hover:bg-gray-100 transition-colors">
          <Menu size={24} className="text-[#293B46]" />
        </button>
        <div className="flex-1" />
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-[#7A7A7A]">Good evening,</div>
            <div className="text-sm font-bold text-[#293B46]">Aarav</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#D4A574] flex items-center justify-center text-white font-bold text-lg">
            A
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors ml-2"
          >
            <X size={20} className="text-[#293B46]" />
          </button>
        </div>
      </div>

      <div className="px-5 mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-[#293B46]">Nearby Issues</h2>
          <span className="bg-[#F3F4F6] text-[#293B46] rounded-full px-2 text-sm font-medium">
            12
          </span>
        </div>
        <button className="text-sm text-[#55B360] font-medium hover:underline">
          See all →
        </button>
      </div>

      <div className="px-5 mt-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onFilterChange(tab.id)}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              activeFilter === tab.id
                ? "bg-[#55B360] text-white"
                : "bg-white border border-[#D7DADE] text-[#293B46] hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="px-5 mt-4 flex flex-col gap-3 pb-5">
        {issues.map((issue) => (
          <div
            key={issue.id}
            onClick={() => onIssueSelect(issue)}
            className="flex gap-3 p-3 rounded-lg border border-[#D7DADE] hover:shadow-[0_2px_12px_rgba(41,59,70,0.06)] transition-shadow cursor-pointer bg-white"
          >
            <img
              src={issue.images?.[0] || "https://placehold.co/100x80"}
              alt={issue.title}
              className="w-[100px] h-[80px] rounded-md object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-[#293B46] truncate">
                  {issue.title}
                  {issue.status === "verified" && (
                    <span className="ml-1 inline-block bg-[#EAF7ED] text-[#328B46] px-1 rounded-sm text-[10px] font-medium align-middle">
                      ✓
                    </span>
                  )}
                </h3>
              </div>
              <div className="text-xs text-[#7A7A7A] mt-1 truncate">
                {issue.location} · {issue.distance}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: getStatusColor(issue.status) }}
                />
                <span className="text-xs text-[#293B46]">
                  {getStatusLabel(issue.status)}
                </span>
                <span className="text-xs text-[#7A7A7A]">· {issue.timeAgo || "2h ago"}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1 text-xs text-[#7A7A7A]">
                  <ThumbsUp size={12} />
                  <span>{issue.supportCount} support</span>
                </div>
                <span className="text-xs text-[#55B360] font-medium">
                  View details →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
