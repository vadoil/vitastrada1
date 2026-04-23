import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";

const STATS = [
  { value: 11, suffix: "", label: "лет на рынке", caption: "С 2014 года" },
  { value: 240, suffix: "+", label: "брендов-партнёров", caption: "DTC, ретейл, fashion" },
  { value: 30, suffix: "", label: "минимальная партия", caption: "Оптимально от 50" },
  { value: 98, suffix: "%", label: "первой годности", caption: "Контроль ОТК" },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const { ref, visible } = useReveal<HTMLSpanElement>(0.4);
  const [n, setN] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!visible || startedRef.current) return;
    startedRef.current = true;
    const dur = 1800;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, value]);

  return (
    <span ref={ref} className="font-display tabular-nums">
      {n}
      {suffix}
    </span>
  );
};

export const Stats = () => {
  return (
    <section className="bg-ink py-28 md:py-40">
      <div className="container-editorial">
        <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-3">
            <div className="text-overline text-gold">— 002</div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="text-editorial-md text-bone font-display max-w-3xl">
              Производство в цифрах. <span className="text-bone-dim italic">Без преувеличений.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-hairline border border-hairline">
          {STATS.map((s, i) => (
            <div key={i} className="bg-ink p-8 md:p-12 group hover:bg-ink-soft transition-colors duration-700">
              <div className="text-overline text-bone-dim mb-8">№ {String(i + 1).padStart(2, "0")}</div>
              <div className="text-[clamp(3rem,7vw,6rem)] leading-none text-bone mb-6">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-bone text-base mb-1">{s.label}</div>
              <div className="text-overline text-bone-dim">{s.caption}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
