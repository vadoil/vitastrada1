import garment from "@/assets/garment.jpg";
import fabrics from "@/assets/fabrics.jpg";
import quality from "@/assets/quality.jpg";
import machine from "@/assets/machine.jpg";

const CATEGORIES = [
  {
    n: "01",
    title: "Верхняя одежда",
    items: ["Пальто", "Тренчи", "Куртки", "Парки"],
    image: garment,
  },
  {
    n: "02",
    title: "Костюмная группа",
    items: ["Жакеты", "Брюки", "Юбки", "Костюмы"],
    image: fabrics,
  },
  {
    n: "03",
    title: "Платья и блузы",
    items: ["Платья", "Блузы", "Сарафаны", "Туники"],
    image: quality,
  },
  {
    n: "04",
    title: "Трикотаж и джерси",
    items: ["Худи", "Свитшоты", "Футболки", "Лонгсливы"],
    image: machine,
  },
];

export const Categories = () => {
  return (
    <section id="capabilities" className="bg-ink py-28 md:py-40 border-t border-hairline">
      <div className="container-editorial">
        <div className="grid grid-cols-12 gap-6 mb-20">
          <div className="col-span-12 md:col-span-3">
            <div className="text-overline text-gold">— 003</div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="text-editorial-lg text-bone font-display max-w-4xl">
              Что мы шьём
            </h2>
            <p className="mt-8 max-w-xl text-bone-dim text-lg leading-relaxed">
              Специализация — сложные изделия, требующие конструкторской проработки, премиальных тканей и выверенных лекал.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline border border-hairline">
          {CATEGORIES.map((c, i) => (
            <article
              key={i}
              className="group relative bg-ink overflow-hidden cursor-pointer"
            >
              <div className="aspect-[4/5] md:aspect-[16/11] overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.4s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
              </div>

              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="text-overline text-bone-dim">№ {c.n}</span>
                  <span className="h-9 w-9 border border-bone/30 flex items-center justify-center group-hover:bg-bone group-hover:text-ink transition-all duration-500">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </span>
                </div>

                <div>
                  <h3 className="text-editorial-md text-bone font-display mb-6">
                    {c.title}
                  </h3>
                  <ul className="flex flex-wrap gap-x-6 gap-y-2 text-overline text-bone-dim">
                    {c.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
