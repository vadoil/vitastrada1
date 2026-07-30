import outerwear from "@/assets/cat-outerwear.jpg";
import suiting from "@/assets/cat-suiting.jpg";
import dresses from "@/assets/cat-dresses.jpg";
import knitwear from "@/assets/cat-knitwear.jpg";
import shirts from "@/assets/cat-shirts.jpg";
import jersey from "@/assets/cat-jersey.jpg";
import jerseyMobile from "@/assets/cat-jersey-mobile.jpg";
import dogwear from "@/assets/cat-dogwear.jpg";
import dogwearMobile from "@/assets/cat-dogwear-mobile.jpg";

type Category = {
  n: string;
  title: string;
  tagline: string;
  items: string[];
  fabrics: string;
  image: string;
  imageMobile?: string;
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
    imageMobile: jerseyMobile,
    size: "md",
  },
  {
    n: "07",
    title: "Couture для собак",
    tagline: "От разработки до партии",
    items: ["Пальто", "Тренчи", "Жилеты", "Свитеры", "Шлейки", "Аксессуары"],
    fabrics: "Шерсть · Кашемир · Технические подкладки",
    image: dogwear,
    imageMobile: dogwearMobile,
    size: "lg",
  },
];

const Card = ({ c }: { c: Category }) => {
  // Mobile keeps aspect to avoid 0-height. Desktop fills the grid row.
  const mobileAspect = c.size === "lg" ? "aspect-[4/5]" : "aspect-[4/5]";

  return (
    <article className={`group relative bg-ink-soft overflow-hidden cursor-pointer ${mobileAspect} md:aspect-auto md:h-full md:min-h-[480px]`}>
      <div className="absolute inset-0 overflow-hidden">
        <picture>
          {c.imageMobile && (
            <source media="(max-width: 767px)" srcSet={c.imageMobile} />
          )}
          <img
            src={c.image}
            alt={c.title}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
          />
        </picture>
        {/* base gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent transition-opacity duration-700 group-hover:opacity-90" />
        {/* gold sweep on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top,_hsl(var(--gold)/0.18),_transparent_60%)]" />
      </div>

      {/* Top meta */}
      <div className="absolute top-5 left-5 right-5 md:top-8 md:left-8 md:right-8 grid grid-cols-[auto_minmax(0,1fr)] gap-3 items-start">
        <span className="text-overline text-bone/80 whitespace-nowrap">№ {c.n}</span>
        <span className="text-overline text-gold text-right break-words min-w-0">
          {c.tagline}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
        <div className="flex items-end justify-between gap-4 md:gap-6 mb-4 min-w-0">
          <h3 className="text-editorial-md text-bone font-display leading-[0.95] min-w-0 break-words">
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
              <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-overline text-bone-dim mb-3">
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
              Что мы <span className="italic text-gold">шьём</span>
            </h2>
            <div className="mt-10 grid grid-cols-12 gap-6">
              <p className="col-span-12 md:col-span-7 text-bone-dim text-base md:text-lg leading-relaxed">
                Семь направлений — от архитектурной верхней одежды и премиального джерси до couture-капсул для собак. Работаем с люксовыми тканями: Loro Piana, Drago, итальянский шёлк, шотландский кашемир. Сложные конструкции и деликатные материалы — наша территория.
              </p>
              <div className="col-span-12 md:col-span-4 md:col-start-9">
                <div className="hairline mb-4" />
                <div className="text-overline text-bone-dim mb-1">Партии</div>
                <div className="text-bone text-2xl font-display">от 5 ед.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial grid — 7 cards across 4 rows */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 md:[grid-template-rows:42rem_32rem_34rem_38rem]">
          <div className="md:col-span-8 md:row-start-1">
            <Card c={CATEGORIES[0]} />
          </div>
          <div className="md:col-span-4 md:row-start-1">
            <Card c={CATEGORIES[1]} />
          </div>

          <div className="md:col-span-4 md:row-start-2">
            <Card c={CATEGORIES[2]} />
          </div>
          <div className="md:col-span-4 md:row-start-2">
            <Card c={CATEGORIES[3]} />
          </div>
          <div className="md:col-span-4 md:row-start-2">
            <Card c={CATEGORIES[4]} />
          </div>

          <div className="md:col-span-12 md:row-start-3">
            <Card c={CATEGORIES[5]} />
          </div>

          {/* Couture для собак — full-width hero */}
          <div className="md:col-span-12 md:row-start-4">
            <Card c={CATEGORIES[6]} />
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
