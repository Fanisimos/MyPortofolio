const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const ArrowUpRight = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowDown = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2}>
    <path d="M12 5v14M5 12l7 7 7-7" />
  </svg>
);

export const Copy = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <rect x="9" y="9" width="12" height="12" rx="2.5" />
    <path d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5" />
  </svg>
);

export const Check = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const Search = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const Sparkle = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
  </svg>
);

export const Hash = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M5 9h14M5 15h14M10 3 8 21M16 3l-2 18" />
  </svg>
);

/** Two-arrow swap used inside .btn__arrow for the hover slide effect. */
export const ArrowSwap = ({ down = false }) => {
  const Icon = down ? ArrowDown : ArrowUpRight;
  return (
    <span className={`btn__arrow${down ? " btn__arrow--down" : ""}`}>
      <Icon size={12} />
      <Icon size={12} />
    </span>
  );
};

/** Renders a monochrome brand icon (any single-colour SVG) tinted via CSS mask. */
export const MaskIcon = ({ src, size = 28, className = "" }) => (
  <span
    className={`mask-icon ${className}`}
    aria-hidden="true"
    style={{
      width: size,
      height: size,
      WebkitMaskImage: `url("${src}")`,
      maskImage: `url("${src}")`,
    }}
  />
);
