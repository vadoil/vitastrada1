import { motion } from "framer-motion";
import atelier from "@/assets/atelier-hands.jpg";
import { RotatingBadge } from "@/components/brand/RotatingBadge";
import { Compass } from "@/components/brand/Compass";

const REASONS = [
  { n: "01", title: "Один менеджер на проект", text: "Не call-центр, а технолог-партнёр, который ведёт коллекцию от лекала до отгрузки." },
  { n: "02", title: "Конструкторская доводка", text: "Корректируем посадку, оптимизируем расход ткани, прорабатываем сложные узлы." },
  { n: "03", title: "Прозрачное ценообразование", text: "Калькуляция по операциям. Без скрытых наценок, без сюрпризов на финальной отгрузке." },
  { n: "04", title: "Гибкость по партиям", text: "От 30 единиц на капсулы до тысяч единиц на сезонные дропы — без потери качества." },
  { n: "05", title: "Соблюдение сроков", text: "98% заказов отгружаются в дату по контракту. Резервируем ёмкость заранее." },
  { n: "06", title: "NDA по умолчанию", text: "Все макеты, лекала и образцы остаются вашей интеллектуальной собственностью." },
];

const ease = [0.22, 1, 0.36, 1] as const;

export const WhyUs = () => {
  return (
    <section className="bg-ink-soft py-28 md:py-40 relative overflow-hidden">
      {/* Decorative compass */}
      <Compass className="absolute top-10 right-10 text-gold/30 hidden md:block" size={120} />

      <div className="container-editorial relative">
        <div className="grid grid-cols-12 gap-10 lg:gap-16">
          {/* Left: image */}
          <div className="col-span-12 lg:col-span-5">
            <div className="sticky top-32">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={atelier}
                  alt="Atelier Noir — production"
                  loading="lazy"
                  className="h-full w-full object-cover animate-slow-zoom"
                />
                {/* Floating rotating badge */}
                <RotatingBadge
                  className="absolute -bottom-10 -right-10 text-bone bg-ink-soft rounded-full"
                  size={130}
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
            <h2 className="text-editorial-lg text-bone font-display mb-16 max-w-2xl break-words hyphens-auto">
              Почему бренды <span className="italic text-bone-dim">остаются</span> с&nbsp;нами
            </h2>

            <div className="divide-y divide-hairline border-y border-hairline">
              {REASONS.map((r, i) => (
                <motion.div
                  key={r.n}
                  className="grid grid-cols-12 gap-x-4 gap-y-2 py-8 group hover:bg-ink/40 transition-colors duration-500 -mx-4 px-4 cursor-default"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease }}
                >
                  <div className="col-span-3 md:col-span-2 text-overline text-gold flex items-center gap-2">
                    <span className="inline-block h-px w-3 bg-gold transition-all duration-500 group-hover:w-6" />
                    {r.n}
                  </div>
                  <div className="col-span-9 md:col-span-4 min-w-0">
                    <h3 className="text-bone text-base md:text-xl break-words transition-transform duration-500 group-hover:translate-x-2">
                      {r.title}
                    </h3>
                  </div>
                  <p className="col-span-12 md:col-span-6 text-bone-dim text-sm md:text-base leading-relaxed break-words">
                    {r.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
