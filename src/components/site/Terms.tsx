const TERMS = [
  { label: "Минимальная партия", value: "30 ед." },
  { label: "Оптимальная партия", value: "от 50 ед." },
  { label: "Срок цикла", value: "от 30 дней" },
  { label: "Предоплата", value: "30 / 70" },
  { label: "Образец", value: "оплачивается отдельно" },
  { label: "География", value: "РФ · ЕАЭС · Европа" },
];

export const Terms = () => {
  return (
    <section className="bg-ink-soft py-28 md:py-40 border-t border-hairline">
      <div className="container-editorial">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-5">
            <div className="text-overline text-gold mb-6">— 008</div>
            <h2 className="text-editorial-lg text-bone font-display mb-10">
              Условия <span className="italic text-bone-dim">сотрудничества</span>
            </h2>
            <p className="text-bone-dim text-lg leading-relaxed max-w-md">
              Прозрачные условия, понятный документооборот, фиксированные сроки. Договор — основа, а не формальность.
            </p>

            <div className="mt-12 inline-flex items-center gap-6">
              <a
                href="#contact"
                className="group inline-flex items-center gap-4 bg-bone text-ink px-7 py-4 text-overline hover:bg-gold transition-colors duration-500"
              >
                Получить расчёт
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform duration-500">
                  <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </a>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="border-t border-hairline">
              {TERMS.map((t, i) => (
                <div
                  key={i}
                  className="flex items-baseline justify-between py-7 border-b border-hairline group"
                >
                  <span className="text-bone-dim text-overline">{t.label}</span>
                  <span className="text-bone text-2xl md:text-3xl font-display">
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
