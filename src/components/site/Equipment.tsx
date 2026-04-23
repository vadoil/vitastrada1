import machine from "@/assets/machine.jpg";

const EQUIPMENT = [
  { brand: "Juki", model: "DDL-9000C", role: "Прямострочные с микролифтом" },
  { brand: "Pegasus", model: "M900 Series", role: "Распошивальные / оверлок" },
  { brand: "Brother", model: "BAS-300H", role: "Программируемая закрепка" },
  { brand: "Veit", model: "Multistar Caldera", role: "Финишное ВТО" },
  { brand: "Gerber", model: "Z7 Cutter", role: "Автоматический раскрой" },
  { brand: "Bullmer", model: "Premiumcut", role: "Высокоточная резка" },
];

export const Equipment = () => {
  return (
    <section className="bg-ink-soft py-28 md:py-40 border-t border-hairline">
      <div className="container-editorial">
        <div className="grid grid-cols-12 gap-6 mb-20">
          <div className="col-span-12 md:col-span-3">
            <div className="text-overline text-gold">— 006</div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="text-editorial-lg text-bone font-display max-w-4xl">
              Оборудование <span className="italic text-bone-dim">класса A</span>
            </h2>
            <p className="mt-8 max-w-xl text-bone-dim text-lg leading-relaxed">
              Японская и немецкая инженерия. Точность настройки до десятых долей миллиметра. Сервис и калибровка — ежемесячно.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          <div className="col-span-12 lg:col-span-5">
            <div className="aspect-square lg:aspect-[4/5] overflow-hidden bg-ink">
              <img
                src={machine}
                alt="Промышленное швейное оборудование"
                loading="lazy"
                className="h-full w-full object-cover animate-slow-zoom"
              />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="border-t border-hairline">
              {EQUIPMENT.map((e, i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 gap-4 py-6 border-b border-hairline group hover:bg-ink/60 transition-colors duration-500 cursor-default"
                >
                  <div className="col-span-1 text-overline text-bone-dim font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="col-span-4 text-bone text-lg font-display">{e.brand}</div>
                  <div className="col-span-3 font-mono text-overline text-gold">{e.model}</div>
                  <div className="col-span-4 text-bone-dim text-sm">{e.role}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-overline text-bone-dim">
              + ВТО, петельные, пуговичные, спецоперации — полный парк
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
