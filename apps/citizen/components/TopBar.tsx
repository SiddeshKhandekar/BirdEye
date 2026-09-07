"use client";

import React from 'react';
import { Menu, Search, Plus, Bell, ChevronDown, Bird } from 'lucide-react';

export interface TopBarProps {
  onMenuClick: () => void;
  onReportIssue: () => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: 'all', label: 'All', color: '' },
  { id: 'potholes', label: 'Potholes', color: 'bg-red-500' },
  { id: 'garbage', label: 'Garbage', color: 'bg-orange-500' },
  { id: 'streetlights', label: 'Streetlights', color: 'bg-yellow-500' },
  { id: 'water', label: 'Water', color: 'bg-blue-500' },
];

export function TopBar({ onMenuClick, onReportIssue, activeFilter, onFilterChange }: TopBarProps) {
  return (
    <header className="fixed top-0 z-30 flex h-16 w-full items-center gap-3 border-b border-[#D7DADE] bg-white/95 px-4 backdrop-blur">
      {/* Hamburger Menu & Brand */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onMenuClick}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg hover:bg-gray-100 text-[#293B46] transition-colors"
          title="Open Menu"
        >
          <Menu size={22} strokeWidth={2} />
        </button>

        <div
          onClick={onMenuClick}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#55B360] text-white shadow-sm">
            <Bird size={20} strokeWidth={2.2} />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#293B46]">BirdEye</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex h-11 flex-1 max-w-[440px] items-center gap-2 rounded-xl border border-[#D7DADE] bg-white px-4 focus-within:border-[#55B360] focus-within:ring-1 focus-within:ring-[#55B360]">
        <Search size={20} className="text-[#969696]" />
        <input
          type="text"
          placeholder="Search for a location, area or issue..."
          className="h-full w-full bg-transparent text-sm text-[#293B46] placeholder:text-[#969696] focus:outline-none"
        />
      </div>

      {/* Filter Chips */}
      <div className="flex flex-1 items-center justify-center gap-2 overflow-x-auto px-2 scrollbar-hide">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`flex h-9 shrink-0 items-center gap-2 rounded-full border px-3 text-sm transition-colors ${
                isActive
                  ? 'border-[#55B360] bg-[#55B360] text-white'
                  : 'border-[#D7DADE] bg-white text-[#293B46] hover:bg-[#F7F8F5]'
              }`}
            >
              {filter.color && (
                <span className={`h-2 w-2 rounded-full ${filter.color}`} />
              )}
              {filter.label}
            </button>
          );
        })}
        <button className="flex h-9 shrink-0 items-center gap-1 rounded-full border border-[#D7DADE] bg-white px-3 text-sm text-[#293B46] hover:bg-[#F7F8F5]">
          More <ChevronDown size={16} className="text-[#7A7A7A]" />
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex shrink-0 items-center gap-4">
        <button
          onClick={onReportIssue}
          className="flex h-11 items-center gap-2 rounded-md bg-[#55B360] px-5 font-semibold text-white transition-colors hover:bg-[#469a50]"
        >
          <Plus size={20} strokeWidth={2} />
          Report Issue
        </button>

        <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#293B46] hover:bg-[#F7F8F5]">
          <Bell size={20} strokeWidth={2} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4A574] text-white">
          <span className="text-sm font-semibold">A</span>
        </button>
      </div>
    </header>
  );
}
