"use client";

import React, { useState } from 'react';
import { MapPin, CheckCircle, Users } from 'lucide-react';

export interface BottomStatsBarProps {
  issuesNearby: number;
  categoryCounts: { label: string; count: number; color: string }[];
  resolvedThisWeek: number;
  communityMembers: string;
  onOpenNearby?: () => void;
}

export function BottomStatsBar({
  issuesNearby,
  categoryCounts,
  resolvedThisWeek,
  communityMembers,
  onOpenNearby,
}: BottomStatsBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 left-6 z-20 flex items-center gap-2">
        <button
          onClick={() => (onOpenNearby ? onOpenNearby() : setIsExpanded(true))}
          className="flex items-center gap-4 rounded-full border border-[#D7DADE] bg-white px-5 py-3 shadow-card transition-all hover:bg-[#FBFCFA] cursor-pointer"
        >
          <span className="text-sm font-medium text-[#293B46]">
            {issuesNearby} issues nearby &rarr;
          </span>
          <div className="flex items-center gap-3 border-l border-[#D7DADE] pl-4">
            {categoryCounts.map((cat, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-xs font-medium text-[#293B46]">{cat.label}</span>
                <span className="text-xs text-[#7A7A7A]">{cat.count}</span>
              </div>
            ))}
          </div>
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-6 left-6 z-20 cursor-pointer rounded-lg border border-[#D7DADE] bg-white px-5 py-3 shadow-[0_2px_12px_rgba(41,59,70,0.06)] transition-all hover:border-[#55B360]/50"
      onClick={() => setIsExpanded(false)}
      title="Click to collapse"
    >
      <div className="flex items-center gap-6">
        {/* Issues Nearby */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF8F0] text-[#55B360]">
            <MapPin size={20} strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#293B46]">{issuesNearby}</span>
            <span className="text-xs text-[#7A7A7A]">Issues nearby</span>
          </div>
        </div>

        <div className="h-8 w-px bg-[#D7DADE]" />

        {/* Resolved This Week */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF8F0] text-[#55B360]">
            <CheckCircle size={20} strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#293B46]">{resolvedThisWeek}</span>
            <span className="text-xs text-[#7A7A7A]">Resolved this week</span>
          </div>
        </div>

        <div className="h-8 w-px bg-[#D7DADE]" />

        {/* Community Members */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF8F0] text-[#55B360]">
            <Users size={20} strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#293B46]">{communityMembers}</span>
            <span className="text-xs text-[#7A7A7A]">Community members</span>
          </div>
        </div>
      </div>
    </div>
  );
}
