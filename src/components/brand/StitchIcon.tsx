type Props = { className?: string; size?: number };

/**
 * Atelier mark — spool of golden thread unwinding into a single stitch.
 * Minimal, no measuring ticks. Pure couture sign.
 */
export const StitchIcon = ({ className = "", size = 56 }: Props) => (
  <svg
    viewBox="0 0 88 56"
    width={size}
    height={(size * 56) / 88}
    fill="none"
    className={className}
    aria-hidden
  >
    {/* Spool — rotating concentric rings */}
    <g className="origin-[20px_28px] animate-spin-slow">
      <circle cx="20" cy="28" r="16" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="20" cy="28" r="11" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.6" />
      <circle cx="20" cy="28" r="6" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.4" />
      <circle cx="20" cy="28" r="1.6" fill="currentColor" />
      <line x1="20" y1="12" x2="20" y2="16" stroke="currentColor" strokeWidth="0.8" />
      <line x1="20" y1="40" x2="20" y2="44" stroke="currentColor" strokeWidth="0.8" />
    </g>

    {/* Thread — animated dashed arc unwinding from spool */}
    <path
      d="M 36 28 Q 56 16 84 28"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="3 3"
      fill="none"
      className="animate-stitch"
      style={{ strokeDashoffset: 200 }}
    />

    {/* Needle eye — small ring at the end of thread */}
    <circle cx="84" cy="28" r="2" stroke="currentColor" strokeWidth="0.8" fill="none" />
  </svg>
);
