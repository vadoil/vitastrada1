type Props = { className?: string; size?: number };

/** Animated needle + thread stitching a horizontal line. */
export const StitchIcon = ({ className = "", size = 56 }: Props) => (
  <svg
    viewBox="0 0 80 56"
    width={size}
    height={(size * 56) / 80}
    fill="none"
    className={className}
    aria-hidden
  >
    {/* Stitched line */}
    <line
      x1="6"
      y1="40"
      x2="74"
      y2="40"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="4 4"
      style={{ strokeDashoffset: 200 }}
      className="animate-stitch"
    />
    {/* Needle */}
    <g className="animate-float-y origin-center">
      <line x1="40" y1="6" x2="40" y2="36" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="40" cy="9" r="2.5" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <line x1="40" y1="36" x2="40" y2="42" stroke="currentColor" strokeWidth="1.2" />
    </g>
  </svg>
);
