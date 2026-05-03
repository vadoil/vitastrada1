import { motion } from "framer-motion";
import { useState } from "react";

type Row = { item: string; variant: string; base: number };

const GROUPS: { title: string; rows: Row[] }[] = [
  {
    title: "Верхняя одежда",
    rows: [
      { item: "Пальто", variant: "без подкладки", base: 8800 },
      { item: "Пальто", variant: "на подкладке", base: 9900 },
      { item: "Пальто", variant: "утеплённое", base: 10900 },
      { item: "Плащ", variant: "на подкладке", base: 9900 },
      { item: "Куртка", variant: "на подкладке", base: 9200 },
      { item: "Куртка", variant: "утеплённая", base: 10000 },
    ],
  },
  {
    title: "Костюмная группа",
    rows: [
      { item: "Пиджак", variant: "без подкладки", base: 8900 },
      { item: "Пиджак", variant: "на подкладке", base: 9700 },
      { item: "Жилет", variant: "без подкладки", base: 4900 },
      { item: "Жилет", variant: "на подкладке", base: 5400 },
      { item: "Брюки", variant: "классические", base: 5600 },
      { item: "Брюки", variant: "джинсы", base: 5200 },
    ],
  },
  {
    title: "Сорочки и лёгкая группа",
    rows: [
      { item: "Рубашка", variant: "классическая", base: 4600 },
      { item: "Рубашка", variant: "поло", base: 3500 },
      { item: "Шорты", variant: "—", base: 4000 },
    ],
  },
];

const EXTRAS = [
  { l: "Градация на 1 размеро-рост", v: "+10%" },
  { l: "Табель мер на модель", v: "+15%" },
  { l: "Норма расхода материалов", v: "+10%" },
  { l: "Тех. описание модели", v: "+15%" },
  { l: "Спецификация деталей кроя", v: "бесплатно" },
  { l: "Конвертация в PDF / Контенс", v: "бесплатно" },
  { l: "Оцифровка 1 лекала", v: "от 60 ₽" },
  { l: "Корректировка после оцифровки", v: "от 300 ₽" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const fmt = (n: number) => n.toLocaleString("ru-RU");

export const Patterns = () => {
  const [active, setActive] = useState(0);

  return (
    <section
      id="patterns"
      className="relative bg-ink py-28 md:py-40 border-t border-hairline overflow-hidden"
    >
      {/* faint pattern paper background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--bone)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--bone)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container-editorial relative">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-3">
            <div className="text-overline text-gold">— 007</div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="text-editorial-lg text-bone font-display max-w-4xl">
              Разработка <span className="italic text-gold">лекал</span> и конструкторская доводка
            </h2>
            <p className="mt-8 max-w-2xl text-bone-dim text-lg leading-relaxed">
              Базовый комплект лекал, градация, табель мер, норма расхода. Работаем в САПР
              <span className="text-bone"> Комтенс</span> — отдаём готовые файлы в форматы вашего производства.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-10 lg:gap-16">
          {/* LEFT — group switcher + table */}
          <div className="col-span-12 lg:col-span-8">
            {/* Tabs — scrollable on mobile */}
            <div className="-mx-6 md:mx-0 mb-10 border-b border-hairline">
              <div className="px-6 md:px-0 flex gap-x-6 md:gap-x-8 gap-y-3 pb-6 overflow-x-auto no-scrollbar md:flex-wrap snap-x snap-mandatory">
                {GROUPS.map((g, i) => (
                  <button
                    key={g.title}
                    onClick={() => setActive(i)}
                    className={`text-overline transition-colors duration-300 relative pb-2 whitespace-nowrap snap-start shrink-0 ${
                      active === i ? "text-gold" : "text-bone-dim hover:text-bone"
                    }`}
                  >
                    {g.title}
                    {active === i && (
                      <motion.span
                        layoutId="patterns-tab"
                        className="absolute -bottom-[25px] left-0 right-0 h-px bg-gold"
                        transition={{ duration: 0.5, ease }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Table header — desktop only */}
            <div className="hidden md:grid grid-cols-12 gap-4 text-overline text-bone-dim pb-4 border-b border-hairline">
              <div className="col-span-1">№</div>
              <div className="col-span-4">Изделие</div>
              <div className="col-span-4">Тип</div>
              <div className="col-span-3 text-right">Базовый комплект</div>
            </div>

            {/* Rows */}
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              {GROUPS[active].rows.map((r, i) => (
                <motion.div
                  key={`${active}-${i}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease }}
                  className="grid grid-cols-12 gap-x-4 gap-y-1 py-4 md:py-5 border-b border-hairline group hover:bg-ink-soft/50 transition-colors duration-500 cursor-default"
                >
                  <div className="col-span-2 md:col-span-1 font-mono text-overline text-bone-dim">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="col-span-7 md:col-span-4 text-bone text-base md:text-lg font-display transition-transform duration-500 group-hover:translate-x-1">
                    {r.item}
                  </div>
                  <div className="col-span-3 md:col-span-3 text-right md:order-none order-last md:col-start-auto">
                    <span className="font-display text-bone text-lg md:text-2xl">
                      {fmt(r.base)}
                    </span>
                    <span className="ml-1 text-overline text-gold">₽</span>
                  </div>
                  <div className="col-start-3 col-span-9 md:col-start-auto md:col-span-4 text-bone-dim text-xs md:text-base">
                    {r.variant}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-6 text-overline text-bone-dim/80">
              ◆ цены — за базовый комплект; усложняющие элементы +2…20% по прайсу
            </div>
          </div>

          {/* RIGHT — extras card */}
          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-32 border border-gold/25 bg-wine-deep/40 p-8 md:p-10 relative overflow-hidden">
              {/* corner ticks */}
              {["top-3 left-3", "top-3 right-3 rotate-90", "bottom-3 left-3 -rotate-90", "bottom-3 right-3 rotate-180"].map(
                (p) => (
                  <svg key={p} className={`absolute ${p} text-gold/70`} width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M0 1H8M1 0V8" stroke="currentColor" strokeWidth="1" />
                  </svg>
                )
              )}

              <div className="text-overline text-gold mb-6">Дополнительные услуги</div>

              <ul className="divide-y divide-hairline">
                {EXTRAS.map((e, i) => (
                  <motion.li
                    key={e.l}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease }}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="text-bone text-sm leading-snug">{e.l}</span>
                    <span className="font-mono text-overline text-gold whitespace-nowrap">
                      {e.v}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-3 text-overline text-bone link-underline"
              >
                <span className="h-px w-6 bg-gold" />
                Запросить смету по вашей модели
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
