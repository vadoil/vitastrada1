type Props = { className?: string };

/** Live indicator — small dot with pulsing ring. Used for "production live" cues. */
export const PulseDot = ({ className = "" }: Props) => (
  <span className={`relative inline-flex h-2 w-2 ${className}`}>
    <span className="absolute inset-0 rounded-full bg-gold animate-pulse-ring" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
  </span>
);
