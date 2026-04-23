type Props = { className?: string; size?: number };

/**
 * Atelier mark — measuring tape with rotating spool of thread.
 * Combines two craft signifiers: precision (ruler ticks) + couture (thread).
 */
export const StitchIcon = ({ className = "", size = 56 }: Props) => (
  <svg
    viewBox="0 0 96 56"
    width={size}
    height={(size * 56) / 96}
    fill="none"
    className={className}
    aria-hidden
  >
    {/* Measuring tape — base line with ticks */}
    <line
      x1="30"
      y1="40"
      x2="92"
      y2="40"
      stroke="currentColor"
      strokeWidth="1"
    />
    {/* Major ticks */}
    {[36, 48, 60, 72, 84].map((x) => (
      <line
        key={`maj-${x}`}
        x1={x}
        y1="34"
        x2={x}
        y2="40"
        stroke="currentColor"
        strokeWidth="1"
      />
    ))}
    {/* Minor ticks */}
    {[33, 39, 42, 45, 51, 54, 57, 63, 66, 69, 75, 78, 81, 87, 90].map((x) => (
      <line
        key={`min-${x}`}
        x1={x}
        y1="37"
        x2={x}
        y2="40"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.55"
      />
    ))}

    {/* Thread arc — drawn from spool to tape, animated */}
    <path
      d="M 16 28 Q 24 44 36 40"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeDasharray="3 3"
      fill="none"
      className="animate-stitch"
      style={{ strokeDashoffset: 200 }}
    />

    {/* Spool — rotating concentric rings */}
    <g className="origin-[16px_20px] animate-spin-slow">
      <circle cx="16" cy="20" r="14" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="16" cy="20" r="10" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.7" />
      <circle cx="16" cy="20" r="6" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.5" />
      <circle cx="16" cy="20" r="1.4" fill="currentColor" />
      {/* spoke marks to make rotation visible */}
      <line x1="16" y1="6" x2="16" y2="10" stroke="currentColor" strokeWidth="0.8" />
      <line x1="16" y1="30" x2="16" y2="34" stroke="currentColor" strokeWidth="0.8" />
    </g>
  </svg>
);
