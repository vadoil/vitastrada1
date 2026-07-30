const TERMS = [
  { label: "Минимальная партия", value: "5 ед." },
  { label: "Оптимальная партия", value: "от 30 ед." },
  { label: "Срок цикла", value: "от 30 дней" },
  { label: "Предоплата", value: "30 / 70" },
  { label: "Образец", value: "оплачивается отдельно" },
  { label: "География", value: "РФ · ЕАЭС · Европа" },
];

export const Terms = () => {
  return (
    <section className="bg-ink-soft py-20 md:py-28 border-t border-hairline">
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5 min-w-0">
            <div className="text-overline text-gold mb-6">— 008</div>
            <h2 className="text-editorial-md text-bone font-display mb-10 break-words hyphens-auto">
              Условия<br />
              <span className="italic text-bone-dim">сотрудничества</span>
            </h2>
            <p className="text-bone-dim text-lg leading-relaxed max-w-md">
              Прозрачные условия, понятный документооборот, фиксированные сроки. Договор — основа, а не формальность.
            </p>

            <div className="mt-12 inline-flex items-center gap-6">
              <a
                href="#contact"
                className="btn-stitched group inline-flex items-center gap-4 bg-bone text-ink px-7 py-4 text-overline hover:bg-gold transition-colors duration-500"
              >
                Получить расчёт
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform duration-500">
                  <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 min-w-0">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-0 md:border-t md:border-hairline">
              {TERMS.map((t, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-between gap-4 md:flex-row md:items-baseline md:justify-between md:gap-6 p-4 md:py-6 border border-hairline md:border-x-0 md:border-t-0 md:border-b group min-h-[120px] md:min-h-0"
                >
                  <span className="text-bone-dim text-overline shrink-0">{t.label}</span>
                  <span className="text-bone text-lg md:text-xl md:text-2xl lg:text-3xl font-display md:text-right break-words min-w-0 mt-auto md:mt-0">
                    {t.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
