import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export const PatternsCTA = () => {
  return (
    <section className="relative bg-wine-deep py-20 md:py-28 overflow-hidden border-t border-hairline">
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: "radial-gradient(ellipse at 70% 40%, hsl(var(--gold) / 0.12) 0%, transparent 60%)" }}
      />

      <div className="container-editorial relative">
        <div className="grid grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="col-span-12 lg:col-span-8"
          >
            <div className="text-overline text-gold mb-5 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              Только до конца месяца
            </div>
            <h3 className="font-display text-3xl md:text-5xl text-bone leading-[1.05]">
              Закажите комплект лекал
              <br />
              и получите{" "}
              <span className="italic text-gold">градацию</span>{" "}
              <span className="whitespace-nowrap">— в подарок</span>
            </h3>
            <p className="mt-6 text-bone-dim max-w-xl text-base md:text-lg leading-relaxed">
              Экономия до <span className="text-bone font-mono">15%</span> от стоимости базового
              комплекта. Передаём готовые файлы под ваше производство — САПР Комтенс, AutoCAD, PDF.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="col-span-12 lg:col-span-4 lg:text-right"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-4 bg-gold text-ink px-8 py-5 text-overline overflow-hidden"
            >
              <span className="absolute inset-0 bg-bone translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative">Забронировать слот</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="relative group-hover:translate-x-1 transition-transform duration-500">
                <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </a>
            <div className="mt-4 text-overline text-bone-dim">
              Осталось мест: <span className="text-gold font-mono">3</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
