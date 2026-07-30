import quality from "@/assets/quality.jpg";

const POINTS = [
  { label: "Входной контроль ткани", value: "100% рулонов" },
  { label: "Проверка лекал", value: "до запуска" },
  { label: "Межоперационный ОТК", value: "5 точек" },
  { label: "Финальная инспекция", value: "поштучно" },
];

export const Standards = () => {
  return (
    <section id="standards" className="relative bg-ink py-20 md:py-28 overflow-hidden">
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 min-w-0">
            <div className="text-overline text-gold mb-6">— 005</div>
            <h2 className="text-editorial-lg text-bone font-display mb-10 max-w-xl">
              Стандарт качества, который видно <span className="italic text-bone-dim">в каждом шве</span>
            </h2>
            <p className="text-bone-dim text-lg leading-relaxed max-w-lg mb-12">
              Качество начинается с входного контроля ткани и заканчивается ручной проверкой каждого изделия перед упаковкой. Между этими точками — пять уровней контроля операторов и технологов.
            </p>

            <div className="border-t border-hairline">
              {POINTS.map((p, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 py-5 border-b border-hairline group">
                  <span className="text-bone text-sm md:text-lg min-w-0 break-words">{p.label}</span>
                  <span className="font-mono text-overline text-gold tracking-wider sm:whitespace-nowrap sm:shrink-0">{p.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 min-w-0">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={quality}
                alt="Контроль качества"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover animate-slow-zoom contrast-[1.15] saturate-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-8 md:right-8 flex items-end justify-between gap-4 min-w-0">
                <div className="text-overline text-bone">
                  <div>Отдел контроля качества</div>
                  <div className="text-bone-dim mt-1">Поштучный контроль</div>
                </div>
                <div className="font-mono text-overline text-gold">
                  Уровень качества · AQL 1.5
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
