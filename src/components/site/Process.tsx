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
    <section id="process" className="bg-ink py-20 md:py-28 border-t border-hairline">
      <div className="container-editorial">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14 md:mb-20">
          <div>
            <div className="text-overline text-gold mb-5">— 007</div>
            <h2 className="text-editorial-lg text-bone font-display">
              Шесть этапов <span className="italic text-bone-dim">от брифа до отгрузки</span>
            </h2>
          </div>
          <div className="text-overline text-bone-dim">
            Цикл · от 30 дней
          </div>
        </div>


        <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-0 md:border-t md:border-hairline">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="group flex flex-col md:grid md:grid-cols-12 md:gap-4 p-4 md:py-14 border border-hairline md:border-x-0 md:border-t-0 md:border-b cursor-default relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-ink-soft -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />

              <div className="text-overline text-gold font-mono relative z-10 mb-2 md:mb-0 md:col-span-1">
                {s.n}
              </div>

              <div className="relative z-10 mb-3 md:mb-0 md:col-span-4">
                <h3 className="text-lg md:text-editorial-md text-bone font-display leading-tight">{s.title}</h3>
              </div>

              <p className="text-bone-dim text-sm md:text-base md:text-lg leading-relaxed relative z-10 mb-3 md:mb-0 md:col-span-5 md:pt-3">
                {s.desc}
              </p>

              <div className="text-overline text-bone-dim relative z-10 font-mono mt-auto md:mt-0 md:col-span-2 md:text-right md:pt-3">
                {s.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
