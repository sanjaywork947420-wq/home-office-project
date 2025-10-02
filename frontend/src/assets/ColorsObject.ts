// src/styles/colorsCustom.ts
export const colors = {
  backgrounds: {
    "bg-page": "#f9fafb",
    "bg-surface": "#ffffff",
    "bg-muted": "#f3f4f6",
    "bg-contrast": "#1f2937",
    "bg-alt": "#eef2ff",
  },
  buttonColors: {
    "button-primary": "#2563eb",       // Blue
    "button-secondary": "#6b7280",     // Gray
    "button-success": "#16a34a",       // Green
    "button-warning": "#f59e0b",       // Amber
    "button-danger": "#dc2626",        // Red
  },
  text: {
    "text-title": "#0f172a",
    "text-subtitle": "#334155",
    "text-body": "#111827",
    "text-secondary": "#6b7280",
    "text-placeholder": "#9ca3af",
    "text-inverse": "#ffffff",
    "text-link": "#a8F0fF",
  },
  brand: {
    "brand-primary": "#2563eb",
    "brand-primary-light": "#60a5fa",
    "brand-primary-dark": "#1e3a8a",
    "brand-accent": "#f59e0b",
    "brand-accent-light": "#fcd34d",
    "brand-accent-dark": "#b45309",
  },
  status: {
    "status-success": "#16a34a",
    "status-warning": "#eab308",
    "status-error": "#dc2626",
    "status-info": "#3b82f6",
    "status-neutral": "#64748b",
  },
  charts: {
    "chart-blue": "#3b82f6",
    "chart-green": "#22c55e",
    "chart-yellow": "#eab308",
    "chart-red": "#ef4444",
    "chart-purple": "#8b5cf6",
  },
  borders: {
    "border-default": "#e5e7eb",
    "border-strong": "#d1d5db",
    "border-focus": "#2563eb",
    "divider": "#e5e7eb",
  },
  utilities: {
    "util-overlay": "rgba(0,0,0,0.5)",
    "util-shadow": "rgba(0,0,0,0.1)",
    "util-highlight": "#e0f2fe",
    "util-disabled": "#9ca3af",
    "util-focus-ring": "rgba(37,99,235,0.3)",
  },
} as const;
