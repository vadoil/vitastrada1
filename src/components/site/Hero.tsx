export const Hero = () => {
  return (
    <section id="top" className="relative h-[100svh] min-h-[720px] w-full overflow-hidden bg-ink noise">
      {/* Video background — luxury atelier / silk / haute couture */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=1920&q=80&auto=format&fit=crop"
      >
        <source
          src="https://cdn.pixabay.com/video/2022/12/05/142090-777964915_large.mp4"
          type="video/mp4"
        />
        <source
          src="https://cdn.pixabay.com/video/2020/09/08/49375-457173846_large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlays — глубже затемняем для контраста */}
      <div className="absolute inset-0 bg-ink/40" />
      <div className="absolute inset-0 bg-gradient-fade-bottom" />
      <div className="absolute inset-0 bg-gradient-vignette" />

      {/* Top fade for nav */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/90 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container-editorial h-full flex flex-col justify-end pb-16 md:pb-24">
        {/* Top meta row */}
        <div className="hidden md:flex items-start justify-between mb-auto pt-32">
          <div className="text-overline text-bone-dim animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="block">Москва</span>
            <span className="block mt-1 text-bone/40">Est. 2014</span>
          </div>
          <div className="text-overline text-bone-dim text-right animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <span className="block">№ 001</span>
            <span className="block mt-1 text-bone/40">Atelier · Noir</span>
          </div>
        </div>

        {/* Headline */}
        <div className="max-w-[1400px]">
          <div className="overflow-hidden mb-6 md:mb-10">
            <div className="text-overline text-bone-dim animate-fade-up">
              Premium contract manufacturing
            </div>
          </div>

          <h1 className="text-editorial-xl text-bone font-display">
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
        <div className="mt-10 md:mt-16 grid grid-cols-12 gap-6 items-end">
          <p className="col-span-12 md:col-span-5 text-bone-dim text-base md:text-lg leading-relaxed animate-fade-up" style={{ animationDelay: "0.7s" }}>
            Контрактное производство одежды для брендов, которые не идут на компромиссы. Партии от 30 единиц. Сложные конструкции. Премиальные ткани. Личное сопровождение от лекала до отгрузки.
          </p>

          <div className="col-span-12 md:col-span-5 md:col-start-8 flex items-center gap-6 animate-fade-up" style={{ animationDelay: "0.85s" }}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-4 bg-bone text-ink px-7 md:px-8 py-4 md:py-5 text-overline hover:bg-gold transition-colors duration-500"
            >
              Оставить заявку
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform duration-500">
                <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </a>
            <a href="#capabilities" className="text-overline text-bone link-underline">
              Возможности
            </a>
          </div>
        </div>

        {/* Bottom hairline + scroll cue */}
        <div className="mt-12 md:mt-16 flex items-end justify-between">
          <div className="hairline flex-1 origin-left animate-draw-line" style={{ animationDelay: "1s" }} />
          <div className="ml-8 text-overline text-bone-dim flex items-center gap-3 animate-fade-in" style={{ animationDelay: "1.2s" }}>
            <span className="h-px w-8 bg-bone/40" />
            Scroll
          </div>
        </div>
      </div>
    </section>
  );
};
