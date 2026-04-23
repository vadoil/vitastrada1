/**
 * Golden running stitch — visual seam between sections.
 * Animated dashes flow horizontally with a small gold rhombus in the middle.
 */
type Props = { className?: string };

export const GoldStitchDivider = ({ className = "" }: Props) => (
  <div className={`container-editorial ${className}`}>
    <div className="gold-stitch gold-stitch-animated" aria-hidden />
  </div>
);
