const STEPS = [
  {
    n: "01",
    title: "Бриф и оценка",
    desc: "Изучаем эскизы, лекала, тех.задание. За 48 часов даём калькуляцию и сроки.",
    duration: "1–2 дня",
  },
  {
    n: "02",
    title: "Образец и доводка",
    desc: "Отшиваем эталонный образец, корректируем посадку, утверждаем технологическую карту.",
    duration: "7–14 дней",
  },
  {
    n: "03",
    title: "Закупка и раскрой",
    desc: "Резервируем ткань, проводим входной контроль, выполняем автоматический раскрой.",
    duration: "5–10 дней",
  },
  {
    n: "04",
    title: "Производство",
    desc: "Поток с межоперационным контролем. Еженедельный фотоотчёт о прогрессе.",
    duration: "14–30 дней",
  },
  {
    n: "05",
    title: "ОТК и упаковка",
    desc: "Поштучная инспекция, ВТО, упаковка в брендированные единицы — готово к ретейлу.",
    duration: "3–5 дней",
  },
  {
    n: "06",
    title: "Отгрузка",
    desc: "Самовывоз или доставка по РФ и странам ЕАЭС. Документы по запросу.",
    duration: "по графику",
  },
];

export const Process = () => {
  return (
    <section id="process" className="bg-ink py-28 md:py-40 border-t border-hairline">
      <div className="container-editorial">
        <div className="grid grid-cols-12 gap-6 mb-20">
          <div className="col-span-12 md:col-span-3">
            <div className="text-overline text-gold">— 007</div>
          </div>
          <div className="col-span-12 md:col-span-9 flex items-end justify-between flex-wrap gap-6">
            <h2 className="text-editorial-lg text-bone font-display max-w-3xl">
              Шесть этапов <span className="italic text-bone-dim">от брифа до отгрузки</span>
            </h2>
            <div className="text-overline text-bone-dim">
              Цикл · от 30 дней
            </div>
          </div>
        </div>

        <div className="border-t border-hairline">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="group grid grid-cols-12 gap-4 py-10 md:py-14 border-b border-hairline cursor-default relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-ink-soft -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />

              <div className="col-span-2 md:col-span-1 text-overline text-gold font-mono relative z-10">
                {s.n}
              </div>

              <div className="col-span-10 md:col-span-4 relative z-10">
                <h3 className="text-editorial-md text-bone font-display">{s.title}</h3>
              </div>

              <p className="col-span-12 md:col-span-5 text-bone-dim text-base md:text-lg leading-relaxed md:pt-3 relative z-10">
                {s.desc}
              </p>

              <div className="col-span-12 md:col-span-2 text-overline text-bone-dim md:text-right md:pt-3 relative z-10 font-mono">
                {s.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
