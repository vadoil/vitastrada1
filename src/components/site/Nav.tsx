import { useEffect, useState } from "react";

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Top of page sits on light hero → dark text. After scroll → dark glass + light text.
  const onLight = !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-hairline"
          : "bg-transparent"
      }`}
    >
      <div className="container-editorial flex items-center justify-between py-5">
        <a
          href="#top"
          className={`group inline-flex items-center gap-3 font-display text-base tracking-[0.2em] transition-colors duration-500 ${
            onLight ? "text-ink" : "text-bone"
          }`}
        >
          <Monogram className="w-7 h-7 transition-transform duration-700 group-hover:rotate-180" />
          <span>ATELIER<span className="text-gold">·</span>NOIR</span>
        </a>

        <nav
          className={`hidden md:flex items-center gap-10 text-overline transition-colors duration-500 ${
            onLight ? "text-ink/70" : "text-bone-dim"
          }`}
        >
          <a href="#capabilities" className={`link-underline transition-colors ${onLight ? "hover:text-ink" : "hover:text-bone"}`}>Производство</a>
          <a href="#process" className={`link-underline transition-colors ${onLight ? "hover:text-ink" : "hover:text-bone"}`}>Процесс</a>
          <a href="#standards" className={`link-underline transition-colors ${onLight ? "hover:text-ink" : "hover:text-bone"}`}>Стандарты</a>
          <a href="#journal" className={`link-underline transition-colors ${onLight ? "hover:text-ink" : "hover:text-bone"}`}>Журнал</a>
        </nav>

        <a
          href="#contact"
          className={`group relative inline-flex items-center gap-3 text-overline transition-colors duration-500 ${
            onLight ? "text-ink" : "text-bone"
          }`}
        >
          <span className="hidden sm:inline">Заявка</span>
          <span
            className={`relative flex h-9 w-9 items-center justify-center border transition-colors ${
              onLight
                ? "border-ink/40 group-hover:border-ink"
                : "border-bone/40 group-hover:border-bone"
            }`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1" />
            </svg>
          </span>
        </a>
      </div>
    </header>
  );
};
