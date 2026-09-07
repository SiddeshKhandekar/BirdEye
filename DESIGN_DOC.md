# BirdEye — UI Design System & Design Document

Based on the BirdEye UI specifications and the finalized six-color palette, this design document serves as the official design system for building the Next.js + Tailwind CSS + Mapbox GL JS frontend.

The PRD explicitly calls for a **map-first citizen interface**, a **floating sidebar over the map**, and **Next.js + Tailwind CSS + Mapbox GL JS**, so this system is designed around that structure.

---

## 1. Design Direction

### Product Character
> **Trustworthy · Civic · Calm · Modern · Data-driven · Human**

The UI should feel like a **real civic infrastructure product**, not a generic SaaS dashboard.

The map is the canvas. Panels, cards, and controls sit on top of it.

### Core Design Rule
> **Map first. Information second. Controls third.**
> 
> Don't let dashboards, cards, or navigation visually overpower the map.

---

## 2. Color System

These six core colors are the official BirdEye design tokens:

| Token | Hex | Role |
|---|---|---|
| `brand-light` | `#77BE86` | Soft brand accent, selected backgrounds, secondary highlights |
| `brand` | `#55B360` | Primary actions, active states, CTA |
| `ink` | `#293B46` | Primary text, icons, headings |
| `neutral-500` | `#7A7A7A` | Secondary text |
| `neutral-200` | `#D7DADE` | Borders, separators, subtle controls |
| `neutral-400` | `#969696` | Placeholder / tertiary text |

### Backgrounds
Backgrounds avoid dull generic gray:

- **App background:** `#F7F8F5`
- **Primary surface:** `#FFFFFF`
- **Secondary surface:** `#FBFCFA`
- **Selected surface:** `#EEF8F0`

*These aren't competing brand colors; they are neutral UI surfaces.*

### Important Rule
> **Don't use `#55B360` everywhere.**
> 
> Use it where the user needs to understand: *"This is actionable / active / selected."*

---

## 3. Color Hierarchy

- **Primary CTA:**
  - `background: #55B360;`
  - `color: #FFFFFF;`
  - *Example:* `+ Report Issue`
- **Hover:**
  - `background: #4AA354;`
- **Selected navigation:**
  - `background: #EEF8F0;`
  - `color: #293B46;`
- **Brand highlight:**
  - `background: #E5F4E8;`
  - `color: #55B360;`
- **Main text:**
  - `color: #293B46;`
- **Secondary text:**
  - `color: #7A7A7A;`
- **Borders:**
  - `border-color: #D7DADE;`
- **Disabled / tertiary:**
  - `color: #969696;`

---

## 4. Tailwind Theme

Add the design tokens to `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bird: {
          100: "#77BE86",
          500: "#55B360",
        },
        ink: {
          900: "#293B46",
        },
        gray: {
          200: "#D7DADE",
          400: "#969696",
          500: "#7A7A7A",
        },
        canvas: {
          DEFAULT: "#F7F8F5",
          subtle: "#FBFCFA",
          selected: "#EEF8F0",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: {
        sm: "8px",
        md: "10px",
        lg: "14px",
        xl: "16px",
        "2xl": "20px",
      },
      boxShadow: {
        panel: "0 8px 30px rgba(41, 59, 70, 0.08)",
        card: "0 2px 12px rgba(41, 59, 70, 0.06)",
        floating: "0 10px 35px rgba(41, 59, 70, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 5. Typography

**Primary Font:** Inter

The UI should be relatively compact because this is a map application.

### Type Scale

| Element | Size | Weight | Line height |
|---|---|---|---|
| **Display** | 32px | 700 | 38px |
| **Page heading** | 24px | 700 | 30px |
| **Section heading** | 18px | 650 | 24px |
| **Card title** | 16px | 600 | 22px |
| **Body** | 14px | 400 | 20px |
| **Body medium** | 14px | 500 | 20px |
| **Small** | 13px | 400 | 18px |
| **Caption** | 12px | 500 | 16px |

### Tailwind Mapping
- `text-xs` → 12px
- `text-sm` → 14px
- `text-base` → 16px
- `text-lg` → 18px
- `text-xl` → 20px
- `text-2xl` → 24px
- `text-3xl` → 30px

> Don't use giant 48–64px SaaS-style headlines inside the main dashboard.

---

## 6. Font Weight

Use weight sparingly:
- `400` → normal content
- `500` → metadata / navigation
- `600` → cards / buttons
- `700` → major headings

*Avoid making everything `font-semibold`. The contrast should come from size + spacing + color.*

---

## 7. Spacing System

BirdEye uses an **8px rhythm**:
`4px` · `8px` · `12px` · `16px` · `20px` · `24px` · `32px` · `40px` · `48px` · `64px`

### Usage
- `4px`: icon ↔ text adjustment
- `8px`: compact elements
- `12px`: badges / controls
- `16px`: card padding
- `20px`: large card padding
- `24px`: sections
- `32px`: major groups
- `40px`: panel separation
- `48px`: major page areas

### Most Common Tailwind Values
- Padding: `p-3` (12px), `p-4` (16px), `p-5` (20px), `p-6` (24px)
- Gaps: `gap-2` (8px), `gap-3` (12px), `gap-4` (16px), `gap-5` (20px), `gap-6` (24px)

---

## 8. Main Application Layout

```
┌──────────────────────────────────────────────┐
│                   TOP BAR                    │
├──────────────┬───────────────────────────────┤
│              │                               │
│  LEFT PANEL  │                               │
│  expandable  │              MAP              │
│              │                               │
│              │                               │
│              │          RIGHT PANEL          │
│              │          expandable           │
└──────────────┴───────────────────────────────┘
```

### Critical Interaction Rule
**Only one drawer can be open at a time:**
- Left OPEN → Right CLOSED
- Left CLOSED → Right OPEN
- Never allow: **Left OPEN + Right OPEN**

*Opening both simultaneously reduces map visibility and creates competing information hierarchy.*

---

## 9. Sidebar Dimensions

### Desktop
- **Left Panel:** Collapsed 64px | Expanded 296–304px (Recommended: **300px**)
- **Right Panel:** Collapsed 56–64px | Expanded 380–420px (Recommended: **400px**)

### Sidebar Spacing
- `padding: 24px`
- `navigation item height: 44px`
- `navigation gap: 4px`
- `section gap: 24px`

---

## 10. Navigation Item

- **Normal:**
  - Height: `44px`
  - Padding: `0 12px`
  - Border radius: `10px`
  - Icon: `20px`
  - Text: `14px`, `font-weight: 500`
- **Active:**
  - Background: `#EEF8F0`
  - Color: `#293B46`
  - Icon: `#55B360`

---

## 11. Top Bar

The top bar floats above the map.

- **Height:** `64px`
- **Horizontal Padding:** `16px–24px`
- **Search:**
  - Height: `44px`
  - Width: `420–460px`
  - Radius: `12px`
  - Background: `#FFFFFF`
  - Border: `1px solid #D7DADE`

```tsx
<div className="h-11 w-[440px] rounded-xl border border-gray-200 bg-white px-4 flex items-center">
  {/* Search input */}
</div>
```

---

## 12. Report Issue Button

This is BirdEye's primary CTA.

```tsx
<button className="h-11 rounded-[10px] bg-bird-500 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4AA354]">
  + Report Issue
</button>
```

- **Height:** `44–48px`
- *Keep dimensions clean and proportionate.*

---

## 13. Floating Cards

Cards sit cleanly above the map without heavy elevation:

- `background: #FFFFFF;`
- `border: 1px solid #D7DADE;`
- `border-radius: 14px;`
- `box-shadow: 0 2px 12px rgba(41, 59, 70, 0.06);`
- **Card padding:** Standard `16px`, Large detail panel `20–24px`

---

## 14. Map

The map is the dominant visual element.

- **Size:** Occupies `calc(100vh - 64px)`
- Do not place heavy backgrounds behind the map.
- Map controls are small, floating white controls.
- **Zoom control:** `40 × 40px`, `border-radius: 10px`
- **Map control spacing:** `8px`

---

## 15. Filter Chips

*Examples:* `All`, `Potholes`, `Garbage`, `Streetlights`, `Water`, `More`

- **Height:** `36px`
- **Horizontal padding:** `12–14px`
- **Border radius:** `9999px` (pill)
- **Selected:** `background: #55B360`, `color: #FFFFFF`
- **Normal:** `background: #FFFFFF`, `border: 1px solid #D7DADE`, `color: #293B46`

---

## 16. Status Colors

Keep brand green separate from operational status colors. Use status colors only to communicate state:

- **Verified:** `background: #EAF7ED; text: #328B46;`
- **Reported:** `background: #FFF4E5; text: #A66300;`
- **In progress:** `background: #EEF3F8; text: #293B46;`
- **Resolved:** `background: #EAF7ED; text: #328B46;`
- **Critical:** `background: #FCEDEA; text: #C9473F;`

---

## 17. Issue Marker System

Different markers communicate clear distinctions:

- **Cluster:** Large circular marker (`40–48px`)
- **Individual issue:** `28–32px`
- **Current user:** `12px core` with `24–32px soft pulse`

### Marker Meanings
- 🟢 **Green:** Resolved / Positive
- 🟠 **Orange:** Pending
- 🔴 **Red:** Critical
- 🔵 **Teal:** Information / Location

---

## 18. Right Issue Panel

- **Width:** `400px`
- **Panel styling:** `background: #FFFFFF; border-left: 1px solid #D7DADE;`
- **Header:** `padding: 20px`, `height: ~72px`
- **Issue image:** `width: 100%`, `height: 180–200px`, `border-radius: 12px`, `object-fit: cover`
- **Title:** `20px`, `font-weight: 700`, `color: #293B46`
- **Location:** `13–14px`, `color: #7A7A7A`

---

## 19. Issue Timeline

Provides clear progression tracking for civic issues:

```
● Reported
│
● Verified
│
○ Assigned
│
○ In Progress
│
○ Resolved
```

- **Spacing:** `20–24px` between timeline nodes
- **Active line:** `#55B360`
- **Inactive line:** `#D7DADE`

---

## 20. Buttons

- **Primary:** `bg-[#55B360] text-white rounded-[10px] h-11 px-4 font-semibold`
- **Secondary:** `bg-white border border-[#D7DADE] text-[#293B46] rounded-[10px] h-11 px-4`
- **Tertiary:** No background, `text-[#293B46] font-medium hover:underline`
- **Destructive:** Reserved strictly for destructive actions (do not introduce generic red accents elsewhere)

---

## 21. Icons

Use **Lucide React** (`lucide-react`):
- **Standard size:** `20px`
- **Small:** `16px`
- **Large:** `24px`
- **Stroke width:** `1.8–2px`
- *Avoid mixing icon libraries.*

---

## 22. Borders

Use subtle borders instead of heavy shadows:
- **Primary border:** `#D7DADE`
- **Divider:** `#E8EAEC`
- *Avoid outlining every tiny element.*

---

## 23. Shadows

Restrained, ambient shadows:
- **Card:** `shadow-[0_2px_12px_rgba(41,59,70,0.06)]`
- **Drawer:** `shadow-[0_8px_30px_rgba(41,59,70,0.08)]`
- **Floating control:** `shadow-[0_4px_16px_rgba(41,59,70,0.08)]`
- *No harsh or dramatic black shadows.*

---

## 24. Drawer Animation & Logic

Transition parameters:
```css
transition: width 200ms ease, transform 200ms ease, opacity 150ms ease;
```
- **Opening:** `200ms ease-out`
- **Closing:** `160ms ease-in`

### Mutually Exclusive State Logic
```tsx
type Drawer = "left" | "right" | null;

const [activeDrawer, setActiveDrawer] = useState<Drawer>(null);

const openDrawer = (drawer: Drawer) => {
  setActiveDrawer(activeDrawer === drawer ? null : drawer);
};
```

---

## 25. Responsive Breakpoints

- **Mobile:** `< 640px` → Bottom sheet pattern over map (citizen-focused PWA)
- **Tablet:** `640–1024px` → Expanded drawer covers partial map
- **Desktop:** `1024–1280px` → Collapsible side drawers
- **Large Desktop:** `1280px+` → Full multi-panel support

---

## 26. Recommended Tailwind Utility Patterns

### Panel
```tsx
className="absolute inset-y-0 left-0 w-[300px] bg-white border-r border-[#D7DADE] shadow-[0_8px_30px_rgba(41,59,70,0.08)] z-20"
```

### Floating Card
```tsx
className="rounded-[14px] border border-[#D7DADE] bg-white shadow-[0_2px_12px_rgba(41,59,70,0.06)] p-4"
```

### Active Navigation
```tsx
className="flex h-11 items-center gap-3 rounded-[10px] bg-[#EEF8F0] px-3 text-[#293B46]"
```

### Typography Classes
- **Secondary text:** `className="text-sm text-[#7A7A7A]"`
- **Disabled text:** `className="text-sm text-[#969696]"`

---

## 27. CSS Custom Properties / Design Tokens

```css
:root {
  --bird-green-light: #77BE86;
  --bird-green: #55B360;

  --bird-ink: #293B46;

  --bird-gray: #7A7A7A;
  --bird-gray-light: #969696;
  --bird-border: #D7DADE;

  --bird-bg: #F7F8F5;
  --bird-surface: #FFFFFF;
  --bird-surface-subtle: #FBFCFA;
  --bird-selected: #EEF8F0;

  --radius-sm: 8px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 16px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
}
```

---

## 28. Visual Rules Checklist

### ✅ Do:
- Off-white canvas (`#F7F8F5`)
- White floating surfaces (`#FFFFFF`)
- `#55B360` action / CTA color
- `#293B46` typography
- `#D7DADE` subtle borders
- Ample breathing room
- Map as the hero visual element

### ❌ Don't:
- ❌ Gray dashboard backgrounds
- ❌ Blue SaaS gradients
- ❌ Glassmorphism
- ❌ Huge dark shadows
- ❌ Excessive rounded pills
- ❌ Too many accent colors
- ❌ Dense cards everywhere
- ❌ Multiple drawers open simultaneously
