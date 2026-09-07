// BirdEye Mock Data — Bengaluru civic issues
// Used for demo until Directus backend is connected

export type IssueCategory = "pothole" | "garbage" | "streetlight" | "water" | "other";
export type IssueStatus = "reported" | "verified" | "assigned" | "in_progress" | "resolved";
export type IssuePriority = "low" | "medium" | "high" | "critical";

export interface TimelineStep {
  status: IssueStatus;
  label: string;
  completed: boolean;
  timestamp?: string;
}

export interface Issue {
  id: string;
  title: string;
  category: IssueCategory;
  categoryLabel: string;
  description: string;
  location: string;
  area: string;
  city: string;
  coordinates: [number, number]; // [lng, lat]
  status: IssueStatus;
  statusLabel: string;
  priority: IssuePriority;
  images: string[];
  reporter: string;
  reporterAvatar: string;
  upvotes: number;
  supportCount: number;
  confirmedCount: number;
  createdAt: string;
  timeAgo: string;
  distance: string;
  verified: boolean;
  timeline: TimelineStep[];
}

export interface UserProfile {
  name: string;
  role: string;
  avatar: string;
  greeting: string;
}

export interface StatsData {
  issuesNearby: number;
  resolvedThisWeek: number;
  communityMembers: string;
}

export interface CategoryCount {
  category: IssueCategory;
  label: string;
  count: number;
  color: string;
}

// Category colors for markers & chips
export const categoryColors: Record<IssueCategory, string> = {
  pothole: "#E53E3E",
  garbage: "#ED8936",
  streetlight: "#ECC94B",
  water: "#4299E1",
  other: "#718096",
};

export const categoryIcons: Record<IssueCategory, string> = {
  pothole: "🔴",
  garbage: "🟠",
  streetlight: "🟡",
  water: "💧",
  other: "⚫",
};

// Mock user
export const currentUser: UserProfile = {
  name: "Aarav",
  role: "Citizen",
  avatar: "",
  greeting: "Good evening",
};

export const sidebarUser: UserProfile = {
  name: "Ananya Sharma",
  role: "Citizen",
  avatar: "",
  greeting: "",
};

// Stats
export const statsData: StatsData = {
  issuesNearby: 24,
  resolvedThisWeek: 7,
  communityMembers: "3.2K",
};

// Category counts
export const categoryCounts: CategoryCount[] = [
  { category: "pothole", label: "Potholes", count: 5, color: "#E53E3E" },
  { category: "garbage", label: "Garbage", count: 3, color: "#ED8936" },
  { category: "streetlight", label: "Lights", count: 2, color: "#ECC94B" },
  { category: "other", label: "Other", count: 2, color: "#718096" },
];

// The 12 mock issues around Bengaluru
export const mockIssues: Issue[] = [
  {
    id: "BE-2024-1837",
    title: "Large pothole on MG Road",
    category: "pothole",
    categoryLabel: "Road / Pothole",
    description:
      "Large pothole approximately 2 feet wide and 8 inches deep on MG Road near the metro station exit. Multiple vehicles have been damaged. Urgent repair needed.",
    location: "MG Road",
    area: "Koramangala 4th Block",
    city: "Bengaluru",
    coordinates: [77.6146, 12.9352],
    status: "verified",
    statusLabel: "Verified",
    priority: "high",
    images: [
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1584463699033-0e674fea87f3?w=600&h=400&fit=crop",
    ],
    reporter: "Ananya S.",
    reporterAvatar: "",
    upvotes: 14,
    supportCount: 14,
    confirmedCount: 14,
    createdAt: "2024-03-15T10:30:00Z",
    timeAgo: "2h ago",
    distance: "240 m away",
    verified: true,
    timeline: [
      { status: "reported", label: "Reported", completed: true, timestamp: "2h ago" },
      { status: "verified", label: "Verified", completed: true, timestamp: "1h ago" },
      { status: "assigned", label: "Assigned", completed: false },
      { status: "in_progress", label: "In Progress", completed: false },
      { status: "resolved", label: "Resolved", completed: false },
    ],
  },
  {
    id: "BE-2024-1836",
    title: "Overflowing garbage bin",
    category: "garbage",
    categoryLabel: "Waste / Garbage",
    description:
      "The community garbage bin at the corner of 12th Cross has been overflowing for 3 days. Waste is spilling onto the road and causing hygiene issues.",
    location: "Indiranagar",
    area: "12th Cross Road",
    city: "Bengaluru",
    coordinates: [77.6408, 12.9784],
    status: "in_progress",
    statusLabel: "In progress",
    priority: "medium",
    images: [
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&h=400&fit=crop",
    ],
    reporter: "Rahul M.",
    reporterAvatar: "",
    upvotes: 8,
    supportCount: 8,
    confirmedCount: 6,
    createdAt: "2024-03-15T05:00:00Z",
    timeAgo: "5h ago",
    distance: "520 m away",
    verified: true,
    timeline: [
      { status: "reported", label: "Reported", completed: true, timestamp: "5h ago" },
      { status: "verified", label: "Verified", completed: true, timestamp: "4h ago" },
      { status: "assigned", label: "Assigned", completed: true, timestamp: "3h ago" },
      { status: "in_progress", label: "In Progress", completed: true, timestamp: "2h ago" },
      { status: "resolved", label: "Resolved", completed: false },
    ],
  },
  {
    id: "BE-2024-1835",
    title: "Streetlight not working",
    category: "streetlight",
    categoryLabel: "Electrical / Streetlight",
    description:
      "The streetlight at 12th Main junction, Koramangala has been non-functional for over a week, making the area unsafe at night.",
    location: "12th Main, Koramangala",
    area: "Koramangala",
    city: "Bengaluru",
    coordinates: [77.6245, 12.9279],
    status: "reported",
    statusLabel: "Reported",
    priority: "medium",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
    ],
    reporter: "Priya K.",
    reporterAvatar: "",
    upvotes: 6,
    supportCount: 6,
    confirmedCount: 4,
    createdAt: "2024-03-15T04:00:00Z",
    timeAgo: "6h ago",
    distance: "1.1 km",
    verified: false,
    timeline: [
      { status: "reported", label: "Reported", completed: true, timestamp: "6h ago" },
      { status: "verified", label: "Verified", completed: false },
      { status: "assigned", label: "Assigned", completed: false },
      { status: "in_progress", label: "In Progress", completed: false },
      { status: "resolved", label: "Resolved", completed: false },
    ],
  },
  {
    id: "BE-2024-1834",
    title: "Water leakage",
    category: "water",
    categoryLabel: "Water / Leakage",
    description:
      "Continuous water leakage from the main pipeline on HSR Layout main road. Water wastage and road damage.",
    location: "HSR Layout",
    area: "HSR Layout",
    city: "Bengaluru",
    coordinates: [77.6368, 12.9116],
    status: "resolved",
    statusLabel: "Resolved",
    priority: "high",
    images: [
      "https://images.unsplash.com/photo-1594398901394-4e34939a02c5?w=600&h=400&fit=crop",
    ],
    reporter: "Deepak R.",
    reporterAvatar: "",
    upvotes: 21,
    supportCount: 21,
    confirmedCount: 18,
    createdAt: "2024-03-14T10:00:00Z",
    timeAgo: "1d ago",
    distance: "1.3 km",
    verified: true,
    timeline: [
      { status: "reported", label: "Reported", completed: true, timestamp: "1d ago" },
      { status: "verified", label: "Verified", completed: true, timestamp: "22h ago" },
      { status: "assigned", label: "Assigned", completed: true, timestamp: "20h ago" },
      { status: "in_progress", label: "In Progress", completed: true, timestamp: "18h ago" },
      { status: "resolved", label: "Resolved", completed: true, timestamp: "6h ago" },
    ],
  },
  {
    id: "BE-2024-1833",
    title: "Broken sidewalk tiles",
    category: "pothole",
    categoryLabel: "Road / Pothole",
    description: "Multiple broken tiles on the sidewalk near BTM Layout bus stop causing tripping hazards for pedestrians.",
    location: "BTM Layout",
    area: "BTM Layout",
    city: "Bengaluru",
    coordinates: [77.6101, 12.9166],
    status: "reported",
    statusLabel: "Reported",
    priority: "medium",
    images: [
      "https://images.unsplash.com/photo-1584463699033-0e674fea87f3?w=600&h=400&fit=crop",
    ],
    reporter: "Kavya L.",
    reporterAvatar: "",
    upvotes: 5,
    supportCount: 5,
    confirmedCount: 3,
    createdAt: "2024-03-15T08:00:00Z",
    timeAgo: "4h ago",
    distance: "890 m",
    verified: false,
    timeline: [
      { status: "reported", label: "Reported", completed: true, timestamp: "4h ago" },
      { status: "verified", label: "Verified", completed: false },
      { status: "assigned", label: "Assigned", completed: false },
      { status: "in_progress", label: "In Progress", completed: false },
      { status: "resolved", label: "Resolved", completed: false },
    ],
  },
  {
    id: "BE-2024-1832",
    title: "Illegal dumping site",
    category: "garbage",
    categoryLabel: "Waste / Garbage",
    description: "Construction debris and household waste being dumped illegally on the vacant plot near Jayanagar 4th Block.",
    location: "Jayanagar 4th Block",
    area: "Jayanagar",
    city: "Bengaluru",
    coordinates: [77.5820, 12.9256],
    status: "verified",
    statusLabel: "Verified",
    priority: "high",
    images: [
      "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=600&h=400&fit=crop",
    ],
    reporter: "Suresh N.",
    reporterAvatar: "",
    upvotes: 12,
    supportCount: 12,
    confirmedCount: 9,
    createdAt: "2024-03-15T07:00:00Z",
    timeAgo: "5h ago",
    distance: "1.5 km",
    verified: true,
    timeline: [
      { status: "reported", label: "Reported", completed: true, timestamp: "5h ago" },
      { status: "verified", label: "Verified", completed: true, timestamp: "3h ago" },
      { status: "assigned", label: "Assigned", completed: false },
      { status: "in_progress", label: "In Progress", completed: false },
      { status: "resolved", label: "Resolved", completed: false },
    ],
  },
  {
    id: "BE-2024-1831",
    title: "Pothole on Outer Ring Road",
    category: "pothole",
    categoryLabel: "Road / Pothole",
    description: "Deep pothole on Outer Ring Road near Marathahalli junction. Very dangerous for two-wheelers.",
    location: "Outer Ring Road",
    area: "Marathahalli",
    city: "Bengaluru",
    coordinates: [77.6971, 12.9562],
    status: "reported",
    statusLabel: "Reported",
    priority: "critical",
    images: [
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&h=400&fit=crop",
    ],
    reporter: "Vikram S.",
    reporterAvatar: "",
    upvotes: 23,
    supportCount: 23,
    confirmedCount: 19,
    createdAt: "2024-03-15T06:00:00Z",
    timeAgo: "6h ago",
    distance: "3.2 km",
    verified: true,
    timeline: [
      { status: "reported", label: "Reported", completed: true, timestamp: "6h ago" },
      { status: "verified", label: "Verified", completed: false },
      { status: "assigned", label: "Assigned", completed: false },
      { status: "in_progress", label: "In Progress", completed: false },
      { status: "resolved", label: "Resolved", completed: false },
    ],
  },
  {
    id: "BE-2024-1830",
    title: "Overflowing drain",
    category: "water",
    categoryLabel: "Water / Drainage",
    description: "Storm drain overflowing and flooding the road near Banashankari bus depot.",
    location: "Banashankari",
    area: "Banashankari",
    city: "Bengaluru",
    coordinates: [77.5726, 12.9250],
    status: "reported",
    statusLabel: "Reported",
    priority: "high",
    images: [
      "https://images.unsplash.com/photo-1594398901394-4e34939a02c5?w=600&h=400&fit=crop",
    ],
    reporter: "Meena K.",
    reporterAvatar: "",
    upvotes: 9,
    supportCount: 9,
    confirmedCount: 7,
    createdAt: "2024-03-15T09:00:00Z",
    timeAgo: "3h ago",
    distance: "2.1 km",
    verified: false,
    timeline: [
      { status: "reported", label: "Reported", completed: true, timestamp: "3h ago" },
      { status: "verified", label: "Verified", completed: false },
      { status: "assigned", label: "Assigned", completed: false },
      { status: "in_progress", label: "In Progress", completed: false },
      { status: "resolved", label: "Resolved", completed: false },
    ],
  },
  {
    id: "BE-2024-1829",
    title: "Damaged road divider",
    category: "pothole",
    categoryLabel: "Road / Infrastructure",
    description: "Road divider broken near JP Nagar 6th Phase signal, causing traffic confusion.",
    location: "JP Nagar 6th Phase",
    area: "JP Nagar",
    city: "Bengaluru",
    coordinates: [77.5856, 12.8963],
    status: "verified",
    statusLabel: "Verified",
    priority: "medium",
    images: [
      "https://images.unsplash.com/photo-1584463699033-0e674fea87f3?w=600&h=400&fit=crop",
    ],
    reporter: "Arjun P.",
    reporterAvatar: "",
    upvotes: 7,
    supportCount: 7,
    confirmedCount: 5,
    createdAt: "2024-03-15T07:30:00Z",
    timeAgo: "5h ago",
    distance: "2.8 km",
    verified: true,
    timeline: [
      { status: "reported", label: "Reported", completed: true, timestamp: "5h ago" },
      { status: "verified", label: "Verified", completed: true, timestamp: "4h ago" },
      { status: "assigned", label: "Assigned", completed: false },
      { status: "in_progress", label: "In Progress", completed: false },
      { status: "resolved", label: "Resolved", completed: false },
    ],
  },
  {
    id: "BE-2024-1828",
    title: "Garbage pile near park",
    category: "garbage",
    categoryLabel: "Waste / Garbage",
    description: "Large pile of mixed waste accumulating near Lalbagh Botanical Garden entrance.",
    location: "Lalbagh",
    area: "Lalbagh",
    city: "Bengaluru",
    coordinates: [77.5855, 12.9507],
    status: "reported",
    statusLabel: "Reported",
    priority: "medium",
    images: [
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&h=400&fit=crop",
    ],
    reporter: "Nisha T.",
    reporterAvatar: "",
    upvotes: 4,
    supportCount: 4,
    confirmedCount: 2,
    createdAt: "2024-03-15T11:00:00Z",
    timeAgo: "1h ago",
    distance: "1.7 km",
    verified: false,
    timeline: [
      { status: "reported", label: "Reported", completed: true, timestamp: "1h ago" },
      { status: "verified", label: "Verified", completed: false },
      { status: "assigned", label: "Assigned", completed: false },
      { status: "in_progress", label: "In Progress", completed: false },
      { status: "resolved", label: "Resolved", completed: false },
    ],
  },
  {
    id: "BE-2024-1827",
    title: "Flickering streetlight",
    category: "streetlight",
    categoryLabel: "Electrical / Streetlight",
    description: "Streetlight on Madiwala Main Road flickering continuously at night, causing visibility issues.",
    location: "Madiwala",
    area: "Madiwala",
    city: "Bengaluru",
    coordinates: [77.6197, 12.9225],
    status: "reported",
    statusLabel: "Reported",
    priority: "low",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
    ],
    reporter: "Sanjay V.",
    reporterAvatar: "",
    upvotes: 3,
    supportCount: 3,
    confirmedCount: 2,
    createdAt: "2024-03-15T10:00:00Z",
    timeAgo: "2h ago",
    distance: "1.4 km",
    verified: false,
    timeline: [
      { status: "reported", label: "Reported", completed: true, timestamp: "2h ago" },
      { status: "verified", label: "Verified", completed: false },
      { status: "assigned", label: "Assigned", completed: false },
      { status: "in_progress", label: "In Progress", completed: false },
      { status: "resolved", label: "Resolved", completed: false },
    ],
  },
  {
    id: "BE-2024-1826",
    title: "Cracked road surface",
    category: "pothole",
    categoryLabel: "Road / Pothole",
    description: "Wide cracks appearing on the road surface near Silk Board junction area.",
    location: "Silk Board",
    area: "Silk Board",
    city: "Bengaluru",
    coordinates: [77.6230, 12.9180],
    status: "reported",
    statusLabel: "Reported",
    priority: "medium",
    images: [
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&h=400&fit=crop",
    ],
    reporter: "Aditya B.",
    reporterAvatar: "",
    upvotes: 6,
    supportCount: 6,
    confirmedCount: 4,
    createdAt: "2024-03-15T09:30:00Z",
    timeAgo: "3h ago",
    distance: "1.9 km",
    verified: false,
    timeline: [
      { status: "reported", label: "Reported", completed: true, timestamp: "3h ago" },
      { status: "verified", label: "Verified", completed: false },
      { status: "assigned", label: "Assigned", completed: false },
      { status: "in_progress", label: "In Progress", completed: false },
      { status: "resolved", label: "Resolved", completed: false },
    ],
  },
];

// Cluster data for map (groups of nearby issues)
export interface ClusterData {
  id: string;
  coordinates: [number, number];
  count: number;
  color: string;
}

export const mockClusters: ClusterData[] = [
  { id: "c1", coordinates: [77.5946, 12.9716], count: 12, color: "#E53E3E" },
  { id: "c2", coordinates: [77.5550, 12.9590], count: 5, color: "#55B360" },
  { id: "c3", coordinates: [77.6200, 12.9750], count: 3, color: "#55B360" },
  { id: "c4", coordinates: [77.6500, 12.9300], count: 4, color: "#55B360" },
];

// User location (Bengaluru center)
export const userLocation: [number, number] = [77.5946, 12.9400];

// Map default center
export const mapCenter: [number, number] = [77.5946, 12.9400];
export const mapZoom = 12.5;
