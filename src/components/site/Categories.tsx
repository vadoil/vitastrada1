import outerwear from "@/assets/cat-outerwear.jpg";
import suiting from "@/assets/cat-suiting.jpg";
import dresses from "@/assets/cat-dresses.jpg";
import knitwear from "@/assets/cat-knitwear.jpg";
import shirts from "@/assets/cat-shirts.jpg";
import jersey from "@/assets/cat-jersey.jpg";

type Category = {
  n: string;
  title: string;
  tagline: string;
  items: string[];
  fabrics: string;
  image: string;
  size: "lg" | "md" | "sm";
};

const CATEGORIES: Category[] = [
  {
    n: "01",
    title: "Верхняя одежда",
    tagline: "Архитектура силуэта",
    items: ["Пальто oversize", "Тренчи", "Шерстяные жакеты", "Парки", "Жилеты"],
    fabrics: "Шерсть · Кашемир · Loro Piana · Drago",
    image: outerwear,
    size: "lg",
  },
  {
    n: "02",
    title: "Костюмная группа",
    tagline: "Итальянский крой",
    items: ["Жакеты", "Брюки палаццо", "Юбки", "Тройки"],
    fabrics: "Шерсть super 130s · Лён · Габардин",
    image: suiting,
    size: "md",
  },
  {
    n: "03",
    title: "Платья",
    tagline: "Драпировка и слип",
    items: ["Slip-платья", "Платья-комбинации", "Вечерние", "Платья-рубашки"],
    fabrics: "Натуральный шёлк · Купро · Вискоза премиум",
    image: dresses,
    size: "md",
  },
  {
    n: "04",
    title: "Трикотаж",
    tagline: "Ручная вязка и фактура",
    items: ["Свитеры oversize", "Кардиганы", "Водолазки", "Джемперы"],
    fabrics: "Меринос · Кашемир · Альпака",
    image: knitwear,
    size: "sm",
  },
  {
    n: "05",
    title: "Блузы и рубашки",
    tagline: "Мягкая роскошь",
    items: ["Шёлковые блузы", "Поплин", "Туники", "Сорочки"],
    fabrics: "Шёлк-сатин · Хлопок Giza · Лён",
    image: shirts,
    size: "sm",
  },
  {
    n: "06",
    title: "Премиум-джерси",
    tagline: "Элевейтид athleisure",
    items: ["Худи", "Свитшоты", "Wide-pants", "Лонгсливы"],
    fabrics: "Хлопок 400 г/м² · Модал · Двунитка премиум",
    image: jersey,
    size: "lg",
  },
];

const Card = ({ c }: { c: Category }) => {
  // Mobile keeps aspect to avoid 0-height. Desktop fills the grid row.
  const mobileAspect = c.size === "lg" ? "aspect-[4/5]" : "aspect-[4/5]";

  return (
    <article className={`group relative bg-ink-soft overflow-hidden cursor-pointer ${mobileAspect} md:aspect-auto md:h-full md:min-h-[480px]`}>
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={c.image}
          alt={c.title}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
        />
        {/* base gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent transition-opacity duration-700 group-hover:opacity-90" />
        {/* gold sweep on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top,_hsl(var(--gold)/0.18),_transparent_60%)]" />
      </div>

      {/* Top meta */}
      <div className="absolute top-6 left-6 right-6 md:top-8 md:left-8 md:right-8 flex items-start justify-between">
        <span className="text-overline text-bone/80">№ {c.n}</span>
        <span className="text-overline text-gold tracking-[0.4em]">
          {c.tagline}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
        <div className="flex items-end justify-between gap-6 mb-4">
          <h3 className="text-editorial-md text-bone font-display leading-[0.95]">
            {c.title}
          </h3>
          <span className="shrink-0 h-10 w-10 md:h-11 md:w-11 border border-bone/40 flex items-center justify-center transition-all duration-500 group-hover:bg-bone group-hover:text-ink group-hover:border-bone group-hover:rotate-45">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1" />
            </svg>
          </span>
        </div>

        {/* Reveal on hover */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-out">
          <div className="overflow-hidden">
            <div className="pt-4 border-t border-bone/20">
              <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-overline text-bone-dim mb-3">
                {c.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <p className="text-bone/70 text-xs md:text-sm font-mono tracking-wide">
                {c.fabrics}
              </p>
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
      <div className="container-editorial">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-3">
            <div className="text-overline text-gold">— 003</div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="text-editorial-lg text-bone font-display max-w-4xl">
              Что мы <span className="italic text-bone-dim">шьём</span>
            </h2>
            <div className="mt-10 grid grid-cols-12 gap-6">
              <p className="col-span-12 md:col-span-7 text-bone-dim text-base md:text-lg leading-relaxed">
                Шесть направлений — от архитектурной верхней одежды до премиального джерси. Специализация на сложных конструкциях и работе с деликатными люксовыми тканями: Loro Piana, Drago, итальянский шёлк, шотландский кашемир.
              </p>
              <div className="col-span-12 md:col-span-4 md:col-start-9">
                <div className="hairline mb-4" />
                <div className="text-overline text-bone-dim mb-1">Партии</div>
                <div className="text-bone text-2xl font-display">от 30 ед.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial grid — explicit row heights so cards perfectly fill, no empty space */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 md:[grid-template-rows:34rem_28rem_24rem]">
          {/* Row 1 — wide hero + tall companion (both share row height) */}
          <div className="md:col-span-8 md:row-start-1">
            <Card c={CATEGORIES[0]} />
          </div>
          <div className="md:col-span-4 md:row-start-1">
            <Card c={CATEGORIES[1]} />
          </div>

          {/* Row 2 — three equal */}
          <div className="md:col-span-4 md:row-start-2">
            <Card c={CATEGORIES[2]} />
          </div>
          <div className="md:col-span-4 md:row-start-2">
            <Card c={CATEGORIES[3]} />
          </div>
          <div className="md:col-span-4 md:row-start-2">
            <Card c={CATEGORIES[4]} />
          </div>

          {/* Row 3 — full bleed wide */}
          <div className="md:col-span-12 md:row-start-3">
            <Card c={CATEGORIES[5]} />
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-16 md:mt-20 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-6">
            <div className="hairline mb-6" />
            <p className="text-bone-dim text-base leading-relaxed">
              Не нашли свою категорию? Мы беремся за нестандартные изделия и капсульные коллекции с особыми требованиями к конструкции.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8 flex md:justify-end">
            <a
              href="#contact"
              className="group inline-flex items-center gap-4 bg-bone text-ink px-7 py-4 text-overline hover:bg-gold transition-colors duration-500"
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
