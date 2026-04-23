type Props = { className?: string };

/** Monogram A·N — used as identity mark. */
export const Monogram = ({ className = "" }: Props) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden
  >
    <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
    <path
      d="M14 46 L26 18 L32 18 L26 32 M22 38 L34 38"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="square"
      strokeLinejoin="miter"
      fill="none"
    />
    <path
      d="M36 46 L36 18 L38 18 L50 40 L50 18"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="square"
      strokeLinejoin="miter"
      fill="none"
    />
    <circle cx="32" cy="55" r="0.8" fill="currentColor" />
  </svg>
);
