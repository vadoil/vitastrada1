const TESTIMONIALS = [
  {
    quote:
      "Шесть сезонов подряд закрывают наши капсулы — от пальто из шерсти Loro Piana до сложного джерси. Качество без замечаний, сроки без сдвигов.",
    author: "Анастасия К.",
    role: "сооснователь, женский бренд одежды",
  },
  {
    quote:
      "Зашли с тестовой партией 50 единиц — в результате передали всё контрактное производство. Технологическая культура другого уровня.",
    author: "Дмитрий М.",
    role: "директор производства, мужская одежда",
  },
  {
    quote:
      "Это не подрядчик, а полноценный производственный отдел на аутсорсе. Конструктор, технолог, ОТК — всё внутри.",
    author: "Софья В.",
    role: "бренд-директор, марка прямых продаж",
  },
];

const LOGOS = ["MAISON ORÉ", "STUDIO CIEL", "FORMA", "NORDIC EDIT", "ATELIER 9", "VESTRE"];

export const Trust = () => {
  return (
    <section className="bg-ink py-20 md:py-28 border-t border-hairline">
      <div className="container-editorial">
        <div className="grid grid-cols-12 gap-6 mb-20">
          <div className="col-span-12 md:col-span-3">
            <div className="text-overline text-gold">— 009</div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="text-editorial-lg text-bone font-display max-w-3xl">
              Доверяют те, для кого <span className="italic text-bone-dim">качество — не опция</span>
            </h2>
          </div>
        </div>

        {/* Logos */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-px bg-hairline border border-hairline mb-20">
          {LOGOS.map((l) => (
            <div
              key={l}
              className="bg-ink py-10 flex items-center justify-center text-overline text-bone-dim hover:text-bone hover:bg-ink-soft transition-all duration-500"
            >
              {l}
            </div>
          ))}
        </div>

        {/* Quotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-hairline border border-hairline">
          {TESTIMONIALS.map((t, i) => (
            <article key={i} className="bg-ink p-10 md:p-12 flex flex-col justify-between gap-10 group hover:bg-ink-soft transition-colors duration-700">
              <div>
                <div className="text-gold text-3xl mb-6 font-display">"</div>
                <p className="text-bone text-lg leading-relaxed">
                  {t.quote}
                </p>
              </div>
              <div>
                <div className="hairline w-12 mb-4" />
                <div className="text-bone text-sm">{t.author}</div>
                <div className="text-overline text-bone-dim mt-1">{t.role}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
