import look1 from "@/assets/look-file-6.jpg";
import look2 from "@/assets/look-file-4.jpg";
import look3 from "@/assets/look-file-3.jpg";
import look4 from "@/assets/look-file-5.jpg";
import look5 from "@/assets/look-file.jpg";
import look6 from "@/assets/look-file-2.jpg";

type Category = {
  n: string;
  title: string;
  tagline: string;
  items: string[];
  fabrics: string;
  image: string;
};

const CATEGORIES: Category[] = [
  {
    n: "01",
    title: "Верхняя одежда",
    tagline: "Архитектура силуэта",
    items: ["Пальто oversize", "Тренчи", "Шерстяные жакеты", "Парки", "Жилеты"],
    fabrics: "Шерсть · Кашемир · Loro Piana · Drago",
    image: look4,
  },
  {
    n: "02",
    title: "Костюмная группа",
    tagline: "Итальянский крой",
    items: ["Жакеты", "Брюки палаццо", "Юбки", "Тройки"],
    fabrics: "Шерсть super 130s · Лён · Габардин",
    image: look5,
  },
  {
    n: "03",
    title: "Платья",
    tagline: "Драпировка и слип",
    items: ["Slip-платья", "Платья-комбинации", "Вечерние", "Платья-рубашки"],
    fabrics: "Натуральный шёлк · Купро · Вискоза премиум",
    image: look3,
  },
  {
    n: "04",
    title: "Трикотаж",
    tagline: "Ручная вязка и фактура",
    items: ["Свитеры oversize", "Кардиганы", "Водолазки", "Джемперы"],
    fabrics: "Меринос · Кашемир · Альпака",
    image: look2,
  },
  {
    n: "05",
    title: "Блузы и рубашки",
    tagline: "Мягкая роскошь",
    items: ["Шёлковые блузы", "Поплин", "Туники", "Сорочки"],
    fabrics: "Шёлк-сатин · Хлопок Giza · Лён",
    image: look6,
  },
  {
    n: "06",
    title: "Демисезонная одежда",
    tagline: "Межсезонье в деталях",
    items: ["Плащи", "Лёгкие пальто", "Ветровки", "Стёганые куртки"],
    fabrics: "Хлопок-твил · Технический нейлон · Шерсть лёгкая",
    image: look1,
  },
];

const Card = ({ c }: { c: Category }) => {
  return (
    <article className="group relative bg-ink-soft overflow-hidden cursor-pointer h-full min-h-[420px] sm:min-h-[520px] lg:min-h-[640px]">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={c.image}
          alt={`${c.title} — пример изделия NOVA & STRADA`}
          loading="lazy"
          className="h-full w-full object-cover object-top contrast-[1.18] saturate-[1.08] brightness-[0.96] transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent transition-opacity duration-700" />

        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top,_hsl(var(--gold)/0.18),_transparent_60%)]" />
      </div>

      {/* Top meta */}
      <div className="absolute top-5 left-5 right-5 md:top-8 md:left-8 md:right-8 grid grid-cols-[auto_minmax(0,1fr)] gap-3 items-start">
        <span className="text-overline text-bone/80 whitespace-nowrap text-sm md:text-base">№ {c.n}</span>
        <span className="text-overline text-gold text-right break-words min-w-0 text-sm md:text-base">
          {c.tagline}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
        <div className="flex items-end justify-between gap-4 mb-4 min-w-0">
          <h3 className="text-2xl md:text-3xl lg:text-editorial-md text-bone font-display leading-[0.95] min-w-0 break-words">
            {c.title}
          </h3>
          <span className="shrink-0 h-10 w-10 md:h-12 md:w-12 border border-bone/40 flex items-center justify-center transition-all duration-500 group-hover:bg-bone group-hover:text-ink group-hover:border-bone group-hover:rotate-45">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1" />
            </svg>
          </span>
        </div>

        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-out">
          <div className="overflow-hidden">
            <div className="pt-4 border-t border-bone/20">
              <ul className="flex flex-wrap gap-x-3 gap-y-1 text-overline text-bone-dim mb-3 text-sm md:text-base">
                {c.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <p className="text-bone/70 text-sm md:text-base font-mono tracking-wide">{c.fabrics}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export const Categories = () => {
  return (
    <section
      id="capabilities"
      className="bg-ink py-28 md:py-40 border-t border-hairline"
    >
      {/* Header stays in container */}
      <div className="container-editorial mb-10 md:mb-16">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <div className="text-overline text-gold">— 003</div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="text-editorial-lg text-bone font-display max-w-4xl">
              Что мы <span className="italic text-gold">шьём</span>
            </h2>
            <div className="mt-10 grid grid-cols-12 gap-6">
              <p className="col-span-12 md:col-span-7 text-bone-dim text-base md:text-lg leading-relaxed">
                Шесть направлений — от архитектурной верхней одежды до премиального трикотажа. Работаем с люксовыми тканями: Loro Piana, Drago, итальянский шёлк, шотландский кашемир. Сложные конструкции и деликатные материалы — наша территория. Ниже — примеры изделий нашего производства.
              </p>
              <div className="col-span-12 md:col-span-4 md:col-start-9">
                <div className="hairline mb-4" />
                <div className="text-overline text-bone-dim mb-1">Партии</div>
                <div className="text-bone text-2xl md:text-3xl font-display">от 5 ед.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width grid */}
      <div className="px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {CATEGORIES.map((c) => (
            <Card key={c.n} c={c} />
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div className="container-editorial mt-16 md:mt-20">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-6">
            <div className="hairline mb-6" />
            <p className="text-bone-dim text-base md:text-lg leading-relaxed">
              Не нашли свою категорию? Мы беремся за нестандартные изделия и капсульные коллекции с особыми требованиями к конструкции.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8 flex md:justify-end">
            <a
              href="#contact"
              className="btn-stitched group inline-flex items-center gap-4 bg-bone text-ink px-7 py-4 text-overline hover:bg-gold transition-colors duration-500"
            >
              Обсудить проект
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="group-hover:translate-x-1 transition-transform duration-500"
              >
                <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
