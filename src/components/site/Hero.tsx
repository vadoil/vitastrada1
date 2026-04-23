import heroImage from "@/assets/hero-fashion.jpg";

export const Hero = () => {
  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[720px] w-full overflow-hidden bg-bone noise"
    >
      {/* Background image — luxury editorial */}
      <img
        src={heroImage}
        alt="Премиальный пошив одежды для брендов — ателье Atelier Noir"
        className="absolute inset-0 h-full w-full object-cover object-center"
        width={1920}
        height={1080}
      />

      {/* Soft top fade for nav legibility */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bone/90 via-bone/40 to-transparent" />
      {/* Bottom fade for caption legibility */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-bone via-bone/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container-editorial h-full flex flex-col">
        {/* Top meta row */}
        <div className="flex items-start justify-between pt-28 md:pt-32">
          <div className="text-overline text-ink/60 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="block text-ink">Москва</span>
            <span className="block mt-1">Est. 2014</span>
          </div>
          <div className="text-overline text-ink/60 text-right animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <span className="block text-ink">№ 001</span>
            <span className="block mt-1">Atelier · Noir</span>
          </div>
        </div>

        <div className="mt-auto pb-14 md:pb-20">
          {/* Headline */}
          <div className="max-w-[1400px]">
            <div className="overflow-hidden mb-6 md:mb-10">
              <div className="text-overline text-ink/70 animate-fade-up">
                Premium contract manufacturing
              </div>
            </div>

            <h1 className="text-editorial-xl text-ink font-display">
              <span className="block animate-fade-up" style={{ animationDelay: "0.15s" }}>
                Шьём то,
              </span>
              <span className="block animate-fade-up italic font-light" style={{ animationDelay: "0.3s" }}>
                что носят
              </span>
              <span className="block animate-fade-up" style={{ animationDelay: "0.45s" }}>
                с гордостью.
              </span>
            </h1>
          </div>

          {/* Sub + CTA */}
          <div className="mt-10 md:mt-14 grid grid-cols-12 gap-6 items-end">
            <p
              className="col-span-12 md:col-span-5 text-ink/75 text-base md:text-lg leading-relaxed animate-fade-up"
              style={{ animationDelay: "0.7s" }}
            >
              Контрактное производство одежды для брендов, которые не идут на компромиссы. Партии от 30 единиц. Сложные конструкции. Премиальные ткани. Личное сопровождение от лекала до отгрузки.
            </p>

            <div
              className="col-span-12 md:col-span-5 md:col-start-8 flex items-center gap-6 animate-fade-up"
              style={{ animationDelay: "0.85s" }}
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-4 bg-ink text-bone px-7 md:px-8 py-4 md:py-5 text-overline hover:bg-foreground/80 transition-colors duration-500"
              >
                Оставить заявку
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
              <a href="#capabilities" className="text-overline text-ink link-underline">
                Возможности
              </a>
            </div>
          </div>

          {/* Bottom hairline + scroll cue */}
          <div className="mt-12 md:mt-14 flex items-end justify-between">
            <div
              className="h-px flex-1 origin-left animate-draw-line bg-ink/30"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="ml-8 text-overline text-ink/60 flex items-center gap-3 animate-fade-in"
              style={{ animationDelay: "1.2s" }}
            >
              <span className="h-px w-8 bg-ink/40" />
              Scroll
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
