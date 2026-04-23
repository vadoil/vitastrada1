import atelier from "@/assets/atelier-hands.jpg";

const REASONS = [
  { n: "01", title: "Один менеджер на проект", text: "Не call-центр, а технолог-партнёр, который ведёт коллекцию от лекала до отгрузки." },
  { n: "02", title: "Конструкторская доводка", text: "Корректируем посадку, оптимизируем расход ткани, прорабатываем сложные узлы." },
  { n: "03", title: "Прозрачное ценообразование", text: "Калькуляция по операциям. Без скрытых наценок, без сюрпризов на финальной отгрузке." },
  { n: "04", title: "Гибкость по партиям", text: "От 30 единиц на капсулы до тысяч единиц на сезонные дропы — без потери качества." },
  { n: "05", title: "Соблюдение сроков", text: "98% заказов отгружаются в дату по контракту. Резервируем ёмкость заранее." },
  { n: "06", title: "NDA по умолчанию", text: "Все макеты, лекала и образцы остаются вашей интеллектуальной собственностью." },
];

export const WhyUs = () => {
  return (
    <section className="bg-ink-soft py-28 md:py-40">
      <div className="container-editorial">
        <div className="grid grid-cols-12 gap-10 lg:gap-16">
          {/* Left: image */}
          <div className="col-span-12 lg:col-span-5">
            <div className="sticky top-32">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={atelier}
                  alt="Atelier Noir — production"
                  loading="lazy"
                  className="h-full w-full object-cover animate-slow-zoom"
                />
              </div>
              <div className="mt-6 flex items-start justify-between">
                <div>
                  <div className="text-overline text-bone">— 004</div>
                  <div className="text-overline text-bone-dim mt-1">Доверие</div>
                </div>
                <div className="text-overline text-bone-dim text-right">
                  <div>Hands-on</div>
                  <div className="text-bone/40 mt-1">production</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: copy + reasons */}
          <div className="col-span-12 lg:col-span-7">
            <h2 className="text-editorial-lg text-bone font-display mb-16 max-w-2xl">
              Почему бренды <span className="italic text-bone-dim">остаются</span> с нами
            </h2>

            <div className="divide-y divide-hairline border-y border-hairline">
              {REASONS.map((r) => (
                <div key={r.n} className="grid grid-cols-12 gap-4 py-8 group hover:bg-ink/40 transition-colors duration-500 -mx-4 px-4">
                  <div className="col-span-2 text-overline text-gold">{r.n}</div>
                  <div className="col-span-10 md:col-span-4">
                    <h3 className="text-bone text-lg md:text-xl">{r.title}</h3>
                  </div>
                  <p className="col-span-12 md:col-span-6 text-bone-dim text-base leading-relaxed">
                    {r.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
