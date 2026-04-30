type Props = { className?: string };

/**
 * NOVA & STRADA mark — couture butterfly knot composed of two thread loops
 * tied at the center. Symbol of two threads, one master, one couture house.
 */
export const Monogram = ({ className = "" }: Props) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden
  >
    {/* Left wing — thread loop */}
    <path
      d="M32 32 C 18 18, 8 22, 8 32 C 8 42, 18 46, 32 32 Z"
      stroke="currentColor"
      strokeWidth="1.1"
      fill="none"
      strokeLinejoin="miter"
    />
    {/* Right wing */}
    <path
      d="M32 32 C 46 18, 56 22, 56 32 C 56 42, 46 46, 32 32 Z"
      stroke="currentColor"
      strokeWidth="1.1"
      fill="none"
      strokeLinejoin="miter"
    />
    {/* Inner left filigree */}
    <path
      d="M30 32 C 22 24, 14 26, 14 32 C 14 38, 22 40, 30 32"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.55"
      fill="none"
    />
    {/* Inner right filigree */}
    <path
      d="M34 32 C 42 24, 50 26, 50 32 C 50 38, 42 40, 34 32"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.55"
      fill="none"
    />
    {/* Central knot — vertical thread */}
    <path d="M32 22 L32 42" stroke="currentColor" strokeWidth="1.1" />
    <ellipse cx="32" cy="32" rx="2.4" ry="3.2" fill="currentColor" />
    {/* Top accent dot */}
    <circle cx="32" cy="18" r="0.9" fill="currentColor" />
    <circle cx="32" cy="46" r="0.9" fill="currentColor" />
  </svg>
);
