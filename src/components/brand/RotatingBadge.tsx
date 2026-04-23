type Props = {
  text?: string;
  size?: number;
  className?: string;
};

/** Circular badge with text rotating slowly around the perimeter. */
export const RotatingBadge = ({
  text = "ATELIER · NOIR · CONTRACT MANUFACTURING · MOSCOW · ",
  size = 140,
  className = "",
}: Props) => {
  const id = `badge-${text.length}`;
  const r = size / 2 - 16;
  const c = size / 2;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="animate-spin-slow"
        aria-hidden
      >
        <defs>
          <path id={id} d={`M ${c}, ${c} m -${r}, 0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`} />
        </defs>
        <text
          fill="currentColor"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
          }}
        >
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>

      {/* Center ornament */}
      <svg
        viewBox="0 0 32 32"
        className="absolute inset-0 m-auto"
        width="22"
        height="22"
        fill="none"
        aria-hidden
      >
        <circle cx="16" cy="16" r="1.4" fill="currentColor" />
        <path d="M16 4 L16 28 M4 16 L28 16" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      </svg>
    </div>
  );
};
