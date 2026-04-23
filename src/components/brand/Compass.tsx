type Props = { className?: string; size?: number };

/** Slowly rotating compass / cross-ornament. */
export const Compass = ({ className = "", size = 48 }: Props) => (
  <svg
    viewBox="0 0 48 48"
    width={size}
    height={size}
    fill="none"
    className={className}
    aria-hidden
  >
    <g className="animate-spin-slow origin-center" style={{ transformOrigin: "24px 24px" }}>
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
      <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      <path d="M24 2 L24 46 M2 24 L46 24" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
      <path
        d="M24 6 L26 24 L24 42 L22 24 Z"
        fill="currentColor"
        opacity="0.9"
      />
    </g>
    <circle cx="24" cy="24" r="1.6" fill="currentColor" />
  </svg>
);
