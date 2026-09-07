"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface FilterChipsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  variant?: "pills" | "tabs";
}

export default function FilterChips({ activeFilter, onFilterChange, variant = "pills" }: FilterChipsProps) {
  const filters = [
    { id: "all", label: "All" },
    { id: "potholes", label: "Potholes", color: "#E53E3E" },
    { id: "garbage", label: "Garbage", color: "#ED8936" },
    { id: "streetlights", label: "Streetlights", color: "#ECC94B" },
    { id: "water", label: "Water", color: "#4299E1" },
    { id: "more", label: "More", icon: true },
  ];

  return (
    <div className="flex gap-2 items-center overflow-x-auto pb-2 scrollbar-hide">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        
        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              variant === "pills"
                ? "h-9 rounded-full px-3 text-sm"
                : "rounded-full px-3 py-1.5 text-xs"
            } ${
              isActive
                ? "bg-[#55B360] text-white"
                : "bg-white border border-[#D7DADE] text-[#293B46] hover:bg-[#FBFCFA]"
            }`}
          >
            {filter.color && (
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: filter.color }}
              />
            )}
            <span className={isActive ? "font-medium" : ""}>{filter.label}</span>
            {filter.icon && <ChevronDown size={14} className={isActive ? "text-white" : "text-[#7A7A7A]"} />}
          </button>
        );
      })}
    </div>
  );
}
