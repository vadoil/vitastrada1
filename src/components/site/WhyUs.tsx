import { motion } from "framer-motion";
import { Compass } from "@/components/brand/Compass";
import { Headset, PenTool, Receipt, Layers, Clock, ShieldCheck, LucideIcon } from "lucide-react";

const REASONS: { n: string; title: string; text: string; icon: LucideIcon }[] = [
  { n: "01", title: "Один менеджер на проект", text: "Не call-центр, а технолог-партнёр, который ведёт коллекцию от лекала до отгрузки.", icon: Headset },
  { n: "02", title: "Конструкторская доводка", text: "Корректируем посадку, оптимизируем расход ткани, прорабатываем сложные узлы.", icon: PenTool },
  { n: "03", title: "Прозрачное ценообразование", text: "Калькуляция по операциям. Без скрытых наценок, без сюрпризов на финальной отгрузке.", icon: Receipt },
  { n: "04", title: "Гибкость по партиям", text: "От 5 единиц на капсулы и тесты рынка до тысяч единиц на сезонные дропы — без потери качества.", icon: Layers },
  { n: "05", title: "Соблюдение сроков", text: "98% заказов отгружаются в дату по контракту. Резервируем ёмкость заранее.", icon: Clock },
  { n: "06", title: "NDA по умолчанию", text: "Все макеты, лекала и образцы остаются вашей интеллектуальной собственностью.", icon: ShieldCheck },
];

const ease = [0.22, 1, 0.36, 1] as const;

export const WhyUs = () => {
  return (
    <section className="bg-ink-soft relative overflow-hidden">
      {/* Decorative compass */}
      <Compass className="absolute top-10 right-10 text-gold/20 hidden md:block" size={100} />

      <div className="container-editorial relative py-20 md:py-28">
        {/* Header */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <motion.div
            className="text-overline text-gold mb-4"
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            — 004 · Доверие
          </motion.div>
          <motion.h2
            className="text-editorial-lg text-bone font-display max-w-3xl break-words hyphens-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            Почему бренды <span className="italic text-bone-dim">остаются</span> с&nbsp;нами
          </motion.h2>
        </div>

        {/* Golden cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.n}
              className="group relative bg-ink border border-gold/30 p-4 md:p-6 lg:p-8 flex flex-col min-h-[180px] md:min-h-[240px] lg:min-h-[280px] hover:border-gold hover:bg-ink/80 transition-all duration-500"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
            >
              {/* Gold corner accent */}
              <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-t border-l border-gold/60 opacity-60 group-hover:opacity-100 group-hover:w-10 group-hover:h-10 transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-b border-r border-gold/60 opacity-60 group-hover:opacity-100 group-hover:w-10 group-hover:h-10 transition-all duration-500" />

              {/* Number */}
              <div className="text-overline text-gold/70 group-hover:text-gold mb-3 md:mb-4 transition-colors duration-500">
                {r.n}
              </div>

              {/* Title */}
              <h3 className="text-bone text-sm md:text-lg lg:text-xl font-medium leading-tight mb-2 md:mb-3 group-hover:text-gold transition-colors duration-500 break-words">
                {r.title}
              </h3>

              {/* Text */}
              <p className="text-bone-dim text-[0.65rem] md:text-sm lg:text-base leading-relaxed break-words mt-auto">
                {r.text}
              </p>

              {/* Subtle gold glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
