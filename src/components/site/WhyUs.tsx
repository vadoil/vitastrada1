import { motion } from "framer-motion";
import atelier from "@/assets/atelier-hands.jpg";
import { RotatingBadge } from "@/components/brand/RotatingBadge";
import { Compass } from "@/components/brand/Compass";

const REASONS = [
  { n: "01", title: "Один менеджер на проект", text: "Не call-центр, а технолог-партнёр, который ведёт коллекцию от лекала до отгрузки." },
  { n: "02", title: "Конструкторская доводка", text: "Корректируем посадку, оптимизируем расход ткани, прорабатываем сложные узлы." },
  { n: "03", title: "Прозрачное ценообразование", text: "Калькуляция по операциям. Без скрытых наценок, без сюрпризов на финальной отгрузке." },
  { n: "04", title: "Гибкость по партиям", text: "От 5 единиц на капсулы и тесты рынка до тысяч единиц на сезонные дропы — без потери качества." },
  { n: "05", title: "Соблюдение сроков", text: "98% заказов отгружаются в дату по контракту. Резервируем ёмкость заранее." },
  { n: "06", title: "NDA по умолчанию", text: "Все макеты, лекала и образцы остаются вашей интеллектуальной собственностью." },
];

const ease = [0.22, 1, 0.36, 1] as const;

export const WhyUs = () => {
  return (
    <section className="bg-ink-soft relative overflow-hidden">
      {/* Decorative compass */}
      <Compass className="absolute top-10 right-10 text-gold/30 hidden md:block" size={120} />

      <div className="container-editorial relative">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left: pinned image — full viewport on desktop, normal stack on mobile */}
          <div className="lg:col-span-5 min-w-0 lg:sticky lg:top-0 lg:h-screen">
            <div className="relative h-[60vh] lg:h-full overflow-hidden">
              <img
                src={atelier}
                alt="Производственный цех Nova & Strada"
                loading="lazy"
                className="h-full w-full object-cover animate-slow-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink-soft/60 via-transparent to-ink-soft/20 lg:to-ink-soft/40" />

              {/* Floating rotating badge */}
              <RotatingBadge
                className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 text-bone bg-ink-soft rounded-full"
                size={120}
              />

              {/* Caption pinned with the image on desktop */}
              <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10">
                <div className="text-overline text-bone">— 004 · Доверие</div>
                <div className="text-overline text-bone-dim mt-1">Ручная сборка</div>
              </div>
            </div>
          </div>

          {/* Right: copy + reasons — scrolls past the image on desktop */}
          <div className="lg:col-span-7 min-w-0 py-20 md:py-28 lg:pl-20 xl:pl-28">
            <h2 className="text-editorial-lg text-bone font-display mb-16 lg:mb-24 max-w-2xl break-words hyphens-auto px-4 sm:px-0">
              Почему бренды <span className="italic text-bone-dim">остаются</span> с&nbsp;нами
            </h2>

            <div className="divide-y divide-hairline border-y border-hairline">
              {REASONS.map((r, i) => (
                <motion.div
                  key={r.n}
                  className="grid grid-cols-[3rem_minmax(0,1fr)] md:grid-cols-12 gap-x-4 gap-y-2 py-8 md:py-10 group hover:bg-ink/40 transition-colors duration-500 cursor-default px-4 sm:px-0"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease }}
                >
                  <div className="md:col-span-2 text-overline text-gold flex items-center gap-2 min-w-0">
                    <span className="inline-block h-px w-3 bg-gold transition-all duration-500 group-hover:w-6" />
                    {r.n}
                  </div>
                  <div className="md:col-span-4 min-w-0">
                    <h3 className="text-bone text-lg md:text-xl lg:text-2xl break-words transition-transform duration-500 group-hover:translate-x-2">
                      {r.title}
                    </h3>
                  </div>
                  <p className="col-span-2 md:col-span-6 text-bone-dim text-sm md:text-base lg:text-lg leading-relaxed break-words min-w-0">
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
