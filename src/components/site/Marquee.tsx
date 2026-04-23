const ITEMS = [
  "От 30 единиц",
  "Премиальные ткани",
  "Сложные конструкции",
  "Полный технологический цикл",
  "Конструкторское бюро",
  "Контроль каждого шва",
  "NDA по умолчанию",
  "Москва · собственное производство",
];

export const Marquee = () => {
  return (
    <section className="relative border-y border-hairline bg-ink-soft py-6 overflow-hidden">
      <div className="flex marquee-track whitespace-nowrap">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <div key={i} className="flex items-center gap-12 px-8">
            <span className="text-overline text-bone">{item}</span>
            <span className="text-gold text-xs">◆</span>
          </div>
        ))}
      </div>
    </section>
  );
};
