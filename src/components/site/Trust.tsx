import { useState, useRef, useCallback } from "react";

const TESTIMONIALS = [
  {
    quote:
      "Шесть сезонов подряд закрывают наши капсулы — от пальто из шерсти Loro Piana до сложного джерси. Качество без замечаний, сроки без сдвигов.",
    author: "Анастасия К.",
    role: "сооснователь, женский бренд одежды",
  },
  {
    quote:
      "Зашли с тестовой партией 50 единиц — в результате передали всё контрактное производство. Технологическая культура другого уровня.",
    author: "Дмитрий М.",
    role: "директор производства, мужская одежда",
  },
  {
    quote:
      "Это не подрядчик, а полноценный производственный отдел на аутсорсе. Конструктор, технолог, ОТК — всё внутри.",
    author: "Софья В.",
    role: "бренд-директор, марка прямых продаж",
  },
];

const LOGOS = ["MAISON ORÉ", "STUDIO CIEL", "FORMA", "NORDIC EDIT", "ATELIER 9", "VESTRE"];

export const Trust = () => {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const handlePrev = useCallback(() => {
    setActive((i) => (i === 0 ? TESTIMONIALS.length - 1 : i - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActive((i) => (i === TESTIMONIALS.length - 1 ? 0 : i + 1));
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? handleNext() : handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section className="bg-ink py-20 md:py-28 border-t border-hairline">
      <div className="container-editorial">
        <div className="mb-14 md:mb-20">
          <div className="text-overline text-gold mb-5">— 009</div>
          <h2 className="text-editorial-lg text-bone font-display">
            Доверяют те, для кого <span className="italic text-bone-dim">качество — не опция</span>
          </h2>
        </div>

        {/* Logos */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-px bg-hairline border border-hairline mb-20">
          {LOGOS.map((l) => (
            <div
              key={l}
              className="bg-ink py-10 flex items-center justify-center text-overline text-bone-dim hover:text-bone hover:bg-ink-soft transition-all duration-500"
            >
              {l}
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div
          className="md:hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="overflow-hidden border border-hairline">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {TESTIMONIALS.map((t, i) => (
                <article
                  key={i}
                  className="w-full flex-shrink-0 bg-ink p-8 flex flex-col justify-between gap-8 min-h-[340px]"
                >
                  <div>
                    <div className="text-gold text-3xl mb-6 font-display">"</div>
                    <p className="text-bone text-base leading-relaxed">
                      {t.quote}
                    </p>
                  </div>
                  <div>
                    <div className="hairline w-12 mb-4" />
                    <div className="text-bone text-sm">{t.author}</div>
                    <div className="text-overline text-bone-dim mt-1">{t.role}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrev}
              aria-label="Предыдущий отзыв"
              className="w-10 h-10 flex items-center justify-center border border-hairline text-bone-dim hover:text-bone hover:bg-ink-soft transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Отзыв ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === active ? "bg-gold" : "bg-bone-dim/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Следующий отзыв"
              className="w-10 h-10 flex items-center justify-center border border-hairline text-bone-dim hover:text-bone hover:bg-ink-soft transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 gap-px bg-hairline border border-hairline">
          {TESTIMONIALS.map((t, i) => (
            <article key={i} className="bg-ink p-10 md:p-12 flex flex-col justify-between gap-10 group hover:bg-ink-soft transition-colors duration-700">
              <div>
                <div className="text-gold text-3xl mb-6 font-display">"</div>
                <p className="text-bone text-lg leading-relaxed">
                  {t.quote}
                </p>
              </div>
              <div>
                <div className="hairline w-12 mb-4" />
                <div className="text-bone text-sm">{t.author}</div>
                <div className="text-overline text-bone-dim mt-1">{t.role}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
