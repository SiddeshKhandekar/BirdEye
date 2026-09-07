"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { TopBar } from "@/components/TopBar";
import { LeftSidebar } from "@/components/LeftSidebar";
import RightPanel from "@/components/RightPanel";

const MapView = dynamic(
  () => import("@/components/MapView").then((mod) => mod.MapView),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full h-[calc(100vh-64px)] mt-16 bg-[#F7F8F5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#55B360] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-[#7A7A7A]">Loading BirdEye Map...</span>
        </div>
      </div>
    ),
  }
);
import NearbyIssuesPanel from "@/components/NearbyIssuesPanel";
import { BottomStatsBar } from "@/components/BottomStatsBar";
import ReportIssueModal from "@/components/ReportIssueModal";
import {
  mockIssues,
  categoryCounts,
  statsData,
  Issue,
  IssueCategory,
} from "@/lib/mock-data";

type DrawerState = "left" | "right" | null;

export default function HomePage() {
  // --- Drawer state (mutually exclusive per DESIGN_DOC §8) ---
  const [activeDrawer, setActiveDrawer] = useState<DrawerState>(null);
  const [activeNav, setActiveNav] = useState("home");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);

  // Toggle left sidebar — closes right panel
  const toggleLeftSidebar = useCallback(() => {
    setActiveDrawer((prev) => (prev === "left" ? null : "left"));
    if (selectedIssue) setSelectedIssue(null);
  }, [selectedIssue]);

  // Close left sidebar
  const closeLeftSidebar = useCallback(() => {
    setActiveDrawer(null);
  }, []);

  // Open right panel (nearby issues list) — closes left sidebar
  const openNearbyPanel = useCallback(() => {
    setActiveDrawer("right");
    setSelectedIssue(null);
  }, []);

  // Close right panel
  const closeRightPanel = useCallback(() => {
    setActiveDrawer(null);
    setSelectedIssue(null);
  }, []);

  // Select an issue from map or nearby list — opens right detail panel
  const handleIssueSelect = useCallback((issue: Issue) => {
    setSelectedIssue(issue);
    setActiveDrawer("right");
  }, []);

  // Click on map (deselect issue preview, but don't close panels)
  const handleMapClick = useCallback(() => {
    // Clicking map background can optionally close panels
  }, []);

  // Filter issues by category
  const filteredIssues =
    activeFilter === "all"
      ? mockIssues
      : mockIssues.filter((issue) => {
          const filterMap: Record<string, IssueCategory> = {
            potholes: "pothole",
            garbage: "garbage",
            streetlights: "streetlight",
            water: "water",
          };
          return issue.category === filterMap[activeFilter];
        });

  // Navigation handler
  const handleNavChange = useCallback(
    (nav: string) => {
      setActiveNav(nav);
      if (nav === "report-issue") {
        setShowReportModal(true);
        closeLeftSidebar();
      } else if (nav === "map") {
        closeLeftSidebar();
      }
    },
    [closeLeftSidebar]
  );

  // Report issue
  const handleReportIssue = useCallback(() => {
    setShowReportModal(true);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-canvas">
      {/* ---- TOP BAR ---- */}
      <TopBar
        onMenuClick={toggleLeftSidebar}
        onReportIssue={handleReportIssue}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* ---- LEFT SIDEBAR ---- */}
      <LeftSidebar
        isOpen={activeDrawer === "left"}
        onClose={closeLeftSidebar}
        activeNav={activeNav}
        onNavChange={handleNavChange}
      />

      {/* ---- MAP ---- */}
      <MapView
        issues={filteredIssues}
        activeFilter={activeFilter}
        selectedIssueId={selectedIssue?.id ?? null}
        onIssueSelect={handleIssueSelect}
        onMapClick={handleMapClick}
      />

      {/* ---- RIGHT PANEL: Issue Detail or Nearby Issues ---- */}
      {selectedIssue ? (
        <RightPanel
          issue={selectedIssue}
          isOpen={activeDrawer === "right" && selectedIssue !== null}
          onClose={closeRightPanel}
        />
      ) : (
        <NearbyIssuesPanel
          issues={filteredIssues}
          isOpen={activeDrawer === "right"}
          onClose={closeRightPanel}
          onIssueSelect={handleIssueSelect}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      )}

      {/* ---- BOTTOM STATS BAR ---- */}
      <BottomStatsBar
        issuesNearby={statsData.issuesNearby}
        categoryCounts={categoryCounts}
        resolvedThisWeek={statsData.resolvedThisWeek}
        communityMembers={statsData.communityMembers}
        onOpenNearby={openNearbyPanel}
      />

      {/* ---- REPORT ISSUE MODAL ---- */}
      <ReportIssueModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
      />

      {/* ---- BACKDROP for left sidebar on mobile ---- */}
      {activeDrawer === "left" && (
        <div
          className="fixed inset-0 z-10 bg-black/20 lg:hidden"
          onClick={closeLeftSidebar}
        />
      )}
    </div>
  );
}
