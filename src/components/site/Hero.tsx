import { motion } from "framer-motion";
import heroImage from "@/assets/hero-fashion.webp";
import { RotatingBadge } from "@/components/brand/RotatingBadge";
import { PulseDot } from "@/components/brand/PulseDot";
import { Monogram } from "@/components/brand/Monogram";
import { StitchIcon } from "@/components/brand/StitchIcon";

const ease = [0.22, 1, 0.36, 1] as const;

export const Hero = () => {
  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[760px] w-full overflow-hidden bg-wine-deep noise"
    >
      {/* Background — wine silk editorial. Contain on desktop so the whole gown fits. */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.04, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease }}
      >
        <img
          src={heroImage}
          alt="Контрактный пошив одежды для премиум-брендов — Nova & Strada, Москва"
          width={1920}
          height={1080}
          className="h-full w-full object-cover object-[78%_center] md:object-center animate-hero-wind"
        />
      </motion.div>

      {/* Mobile: subtle wine wash on left so headline reads over silk swirl */}
      <div className="md:hidden absolute inset-0 bg-gradient-to-r from-wine-deep via-wine-deep/55 to-transparent" />

      {/* Desktop: very soft left vignette — keep the silk wave visible */}
      <div className="hidden md:block absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-wine-deep/85 via-wine-deep/35 to-transparent" />
      <div className="hidden md:block absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-wine-deep/70 to-transparent" />
      <div className="hidden md:block absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-wine-deep/80 to-transparent" />

      {/* Gold corner crosshair marks */}
      <div className="pointer-events-none absolute inset-6 md:inset-10 hidden md:block">
        {[
          "top-0 left-0",
          "top-0 right-0 rotate-90",
          "bottom-0 left-0 -rotate-90",
          "bottom-0 right-0 rotate-180",
        ].map((pos, i) => (
          <motion.svg
            key={pos}
            className={`absolute ${pos} text-gold/50`}
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.4 + i * 0.1, ease }}
          >
            <path d="M0 1 H10 M1 0 V10" stroke="currentColor" strokeWidth="1" />
          </motion.svg>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container-editorial h-full flex flex-col">
        {/* Top meta row */}
        <div className="flex items-start justify-between pt-28 md:pt-32">
          <motion.div
            className="hidden md:flex items-center gap-4 text-overline text-bone"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
          >
            <PulseDot />
            <span>Производство активно · смена 002</span>
          </motion.div>

          <motion.div
            className="hidden md:flex flex-col items-end gap-1 text-overline text-bone-dim leading-tight"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease }}
          >
            <span className="text-bone">Москва</span>
            <span className="text-bone-dim/70 text-[0.6rem] tracking-[0.3em]">55.7558° N · 37.6173° E</span>
          </motion.div>
        </div>

        <div className="mt-auto pb-14 md:pb-20 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-8 lg:col-span-9">
            {/* Eyebrow with stitch icon */}
            <motion.div
              className="hidden md:flex items-center gap-4 mb-8 md:mb-12"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease }}
            >
              <StitchIcon className="text-gold" size={48} />
              <div className="text-overline text-gold/90">
                — 001 · Nova &amp; Strada · контрактный пошив премиум-класса
              </div>
            </motion.div>

            {/* HEADLINE — AIDA: Attention */}
            <h1 className="text-editorial-xl text-bone font-display max-w-[1100px]">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease }}
              >
                Контрактный пошив
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7, ease }}
              >
                для{" "}
                <span className="italic font-light text-gold">premium</span>{" "}
                брендов
              </motion.span>
            </h1>

            {/* Tagline */}
            <motion.p
              className="mt-8 md:mt-10 text-bone/75 text-base md:text-xl font-display tracking-tight max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1, ease }}
            >
              <span className="italic">«То, что носят с гордостью.»</span>
            </motion.p>

            {/* Sub + CTA */}
            <div className="mt-10 md:mt-14 grid grid-cols-12 gap-6 items-end">
              <motion.p
                className="col-span-12 md:col-span-7 text-bone/85 text-base md:text-lg leading-relaxed"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.1, ease }}
              >
                Полный цикл: лекало, образец, отшив, контроль качества, отгрузка. Партии от 5 единиц. Премиальные ткани. Сложные конструкции. Личный технолог.
              </motion.p>

              <motion.div
                className="col-span-12 md:col-span-5 flex items-center gap-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.25, ease }}
              >
                <a
                  href="#contact"
                  className="btn-stitched group relative inline-flex items-center gap-4 bg-gold text-ink px-8 py-5 text-overline overflow-hidden"
                >
                  <span className="absolute inset-0 bg-bone translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative">Запросить расчёт</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="relative group-hover:translate-x-1 transition-transform duration-500"
                  >
                    <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </a>
                <a href="#capabilities" className="text-overline text-bone link-underline">
                  Возможности
                </a>
              </motion.div>
            </div>
          </div>

          {/* Right rail */}
          <motion.div
            className="hidden lg:flex col-span-3 flex-col items-end gap-10"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2, ease }}
          >
            <RotatingBadge className="text-gold" size={150} />
            <Monogram className="text-gold w-14 h-14" />
          </motion.div>
        </div>

        {/* Bottom hairline + scroll cue */}
        <div className="absolute inset-x-0 bottom-6 md:bottom-10 container-editorial mx-auto flex items-end justify-between">
          <motion.div
            className="h-px flex-1 origin-left bg-gold/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 1.4, ease }}
          />
          <motion.div
            className="ml-8 text-overline text-bone-dim flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.7, ease }}
          >
            <span className="h-px w-8 bg-gold/40" />
            <span className="animate-float-y inline-block">Scroll</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
