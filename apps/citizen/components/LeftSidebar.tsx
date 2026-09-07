"use client";

import React from 'react';
import { Home, PlusCircle, Map, FileText, Users, Award, X, Shield, ChevronRight, Bird } from 'lucide-react';

export interface LeftSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeNav: string;
  onNavChange: (nav: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'report-issue', label: 'Report Issue', icon: PlusCircle },
  { id: 'map', label: 'Map', icon: Map },
  { id: 'my-reports', label: 'My Reports', icon: FileText },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'rewards', label: 'Rewards', icon: Award },
];

export function LeftSidebar({ isOpen, onClose, activeNav, onNavChange }: LeftSidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-16 z-20 h-[calc(100vh-64px)] w-[300px] border-r border-[#D7DADE] bg-white shadow-panel transition-transform duration-200 ease-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-full flex-col p-6">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#55B360]/10 text-[#55B360]">
              <Bird size={24} strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#293B46]">BirdEye</h1>
              <p className="text-xs text-[#7A7A7A]">Safer Streets, Stronger Communities</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#7A7A7A] hover:bg-[#F7F8F5] hover:text-[#293B46]"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavChange(item.id)}
                className={`flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#EEF8F0] text-[#293B46]'
                    : 'text-[#293B46] hover:bg-[#FBFCFA]'
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={2}
                  className={isActive ? 'text-[#55B360]' : 'text-[#7A7A7A]'}
                />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="my-6 h-px w-full bg-[#D7DADE]" />

        {/* Switch View */}
        <div>
          <h2 className="mb-2 text-xs uppercase tracking-wider text-[#7A7A7A]">Switch View</h2>
          <div className="flex flex-col gap-1">
            <button className="flex h-11 items-center gap-3 rounded-md bg-[#EEF8F0] px-3 text-sm font-medium text-[#293B46]">
              <span className="flex h-5 w-5 items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-[#55B360]" />
              </span>
              Civic (Public)
            </button>
            <button className="flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium text-[#293B46] hover:bg-[#FBFCFA]">
              <Shield size={20} className="text-[#7A7A7A]" />
              Security (RWA)
            </button>
          </div>
        </div>

        <div className="flex-1" />

        {/* User Profile */}
        <button className="flex w-full items-center justify-between rounded-xl border border-[#D7DADE] bg-white p-3 shadow-sm transition-colors hover:bg-[#FBFCFA]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#55B360] text-white">
              <span className="text-sm font-semibold">AS</span>
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="text-sm font-medium text-[#293B46]">Ananya Sharma</span>
              <span className="text-xs text-[#7A7A7A]">Citizen</span>
            </div>
          </div>
          <ChevronRight size={20} className="text-[#7A7A7A]" />
        </button>
      </div>
    </aside>
  );
}
