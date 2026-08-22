import { useEffect, useRef, useState } from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement>;

/**
 * Картинка с золотым скелетоном на время загрузки.
 * Проявляется из размытия, когда изображение готово.
 */
export const SmartImage = ({ className = "", ...props }: Props) => {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // картинка из кэша может успеть загрузиться до монтирования
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <>
      <div
        aria-hidden
        className={`img-skeleton pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        className={`h-full w-full transition-[opacity,filter] duration-[900ms] ease-out ${
          loaded ? "opacity-100 blur-0" : "opacity-0 blur-lg"
        }`}
      >
        <img
          ref={ref}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={className}
          {...props}
        />
      </div>
    </>
  );
};
