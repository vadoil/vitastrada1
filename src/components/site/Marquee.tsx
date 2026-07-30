const ITEMS = [
  "От 5 единиц",
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
      <div className="flex marquee-track whitespace-nowrap min-w-max">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <div key={i} className="flex items-center gap-6 md:gap-12 px-4 md:px-8">
            <span className="text-overline text-bone">{item}</span>
            <span className="text-gold text-xs">◆</span>
          </div>
        ))}
      </div>
    </section>
  );
};
