/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bird: {
          100: "#77BE86",
          500: "#55B360",
          600: "#4AA354",
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
        status: {
          verified: "#328B46",
          "verified-bg": "#EAF7ED",
          reported: "#A66300",
          "reported-bg": "#FFF4E5",
          progress: "#293B46",
          "progress-bg": "#EEF3F8",
          resolved: "#328B46",
          "resolved-bg": "#EAF7ED",
          critical: "#C9473F",
          "critical-bg": "#FCEDEA",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
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
        control: "0 4px 16px rgba(41, 59, 70, 0.08)",
      },
    },
  },
  plugins: [],
};
