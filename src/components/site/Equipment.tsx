import machine from "@/assets/machine.jpg";
import iechoCutter from "@/assets/iecho-cutter.jpg";
import { motion } from "framer-motion";

const EQUIPMENT = [
  { brand: "Juki", model: "DDL-9000C", role: "Прямострочные с микролифтом" },
  { brand: "Pegasus", model: "M900 Series", role: "Распошивальные / оверлок" },
  { brand: "Brother", model: "BAS-300H", role: "Программируемая закрепка" },
  { brand: "Veit", model: "Multistar Caldera", role: "Финишное ВТО" },
];

const CUT_STATS = [
  { v: "± 0.1", u: "мм", l: "точность реза" },
  { v: "75", u: "мм", l: "толщина настила" },
  { v: "2.5×2.2", u: "м", l: "рабочий стол" },
  { v: "× 8", u: "быстрее", l: "ручного раскроя" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export const Equipment = () => {
  return (
    <section className="bg-ink-soft py-28 md:py-40 border-t border-hairline">
      <div className="container-editorial">
        {/* ───────── Header ───────── */}
        <div className="grid grid-cols-12 gap-6 mb-20">
          <div className="col-span-12 md:col-span-3">
            <div className="text-overline text-gold">— 006</div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="text-editorial-lg text-bone font-display max-w-4xl">
              Оборудование <span className="italic text-gold">класса A</span>
            </h2>
            <p className="mt-8 max-w-xl text-bone-dim text-lg leading-relaxed">
              Японская и немецкая инженерия. Точность настройки до десятых долей миллиметра. Сервис и калибровка — ежемесячно.
            </p>
          </div>
        </div>

        {/* ───────── HERO: Автоматический раскрой ───────── */}
        <motion.div
          className="relative mb-24 md:mb-32 overflow-hidden border border-gold/25 bg-wine-deep/60"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease }}
        >
          {/* gold corner ticks */}
          {["top-3 left-3", "top-3 right-3 rotate-90", "bottom-3 left-3 -rotate-90", "bottom-3 right-3 rotate-180"].map(
            (p) => (
              <svg key={p} className={`absolute ${p} text-gold/70`} width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M0 1H8M1 0V8" stroke="currentColor" strokeWidth="1" />
              </svg>
            )
          )}

          {/* animated grid + sweeping cut line */}
          <div className="absolute inset-0 opacity-[0.10] pointer-events-none"
               style={{
                 backgroundImage:
                   "linear-gradient(hsl(var(--gold)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold)) 1px, transparent 1px)",
                 backgroundSize: "44px 44px",
               }}
          />
          <motion.div
            className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-gold to-transparent pointer-events-none z-10"
            initial={{ left: "0%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
            style={{ boxShadow: "0 0 24px hsl(var(--gold) / 0.6)" }}
          />

          <div className="relative grid grid-cols-12 gap-0">
            {/* LEFT — copy */}
            <div className="col-span-12 lg:col-span-7 p-8 md:p-14 lg:p-16">
              <div className="flex items-center gap-3 text-overline text-gold mb-8">
                <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                <span>iECHO GLSA-2520 · Смарт-Т · цех автоматического раскроя</span>
              </div>

              <h3 className="text-editorial-lg text-bone font-display leading-[1.02]">
                Автоматический раскрой —<br />
                <span className="italic text-gold">сердце нашего цеха</span>
              </h3>

              <p className="mt-8 max-w-xl text-bone-dim text-base md:text-lg leading-relaxed">
                Промышленный раскройный комплекс <span className="text-bone">iECHO GLSA-2520</span> от «Смарт-Т» — рабочий стол <span className="text-bone">2,5 × 2,2&nbsp;м</span> и настил толщиной до <span className="text-bone">75&nbsp;мм</span>. Векторное лекало уходит из CAD прямо на стол: нож точно и быстро режет ткани разных по составу и свойствам — от шёлка до плотной шерсти. Идеальная геометрия каждой детали и скорость в 8&nbsp;раз выше ручного раскроя.
              </p>

              <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 max-w-md text-bone text-sm">
                {[
                  "Раскладка с минимальным расходом ткани",
                  "Шёлк, кашемир, кожа, технотекстиль",
                  "Многослойный настил до 75 мм",
                  "Полная цифровая проверка лекал",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="mt-1.5 h-px w-3 shrink-0 bg-gold" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT — photo + stats */}
            <div className="col-span-12 lg:col-span-5 border-t lg:border-t-0 lg:border-l border-gold/20 bg-ink/30">
              <div className="relative aspect-[4/3] overflow-hidden border-b border-gold/20">
                <img
                  src={iechoCutter}
                  alt="Раскройный комплекс iECHO GLSA-2520"
                  loading="lazy"
                  className="h-full w-full object-cover animate-slow-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-overline text-gold/90">iECHO GLSA-2520</div>
              </div>
              <div className="p-8 md:p-10">
                <div className="text-overline text-bone-dim mb-6">Цифры</div>
                <div className="space-y-5">
                  {CUT_STATS.map((s, i) => (
                    <motion.div
                      key={s.l}
                      className="flex items-baseline justify-between gap-6 border-b border-hairline pb-4"
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease }}
                    >
                      <div className="text-bone font-display text-3xl md:text-4xl leading-none">
                        {s.v}
                        <span className="ml-2 text-sm text-gold tracking-wide">{s.u}</span>
                      </div>
                      <div className="text-overline text-bone-dim text-right max-w-[8rem]">{s.l}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 text-overline text-gold/80">
                  ◆ Лекало → раскройный комплекс → швейный поток — без бумаги
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ───────── Парк швейного оборудования ───────── */}
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
            <div className="text-overline text-bone-dim mb-6">Швейный парк</div>
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
              + петельные, пуговичные, спецоперации — полный парк
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
