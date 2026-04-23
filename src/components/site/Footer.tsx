export const Footer = () => {
  return (
    <footer className="bg-ink border-t border-hairline">
      <div className="container-editorial py-16">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-6">
            <div className="font-display text-2xl tracking-[0.15em] text-bone mb-4">
              ATELIER<span className="text-gold">·</span>NOIR
            </div>
            <p className="text-bone-dim text-sm max-w-sm">
              Контрактное швейное производство премиум-класса. Москва.
            </p>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="text-overline text-bone-dim mb-4">Навигация</div>
            <ul className="space-y-2 text-bone text-sm">
              <li><a href="#capabilities" className="link-underline">Производство</a></li>
              <li><a href="#process" className="link-underline">Процесс</a></li>
              <li><a href="#standards" className="link-underline">Стандарты</a></li>
              <li><a href="#journal" className="link-underline">Журнал</a></li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="text-overline text-bone-dim mb-4">Контакт</div>
            <ul className="space-y-2 text-bone text-sm">
              <li><a href="mailto:hello@ateliernoir.ru" className="link-underline">hello@ateliernoir.ru</a></li>
              <li><a href="tel:+74950000000" className="link-underline font-mono">+7 495 000 00 00</a></li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-2">
            <div className="text-overline text-bone-dim mb-4">Соц.</div>
            <ul className="space-y-2 text-bone text-sm">
              <li><a href="#" className="link-underline">Instagram</a></li>
              <li><a href="#" className="link-underline">Telegram</a></li>
              <li><a href="#" className="link-underline">Behance</a></li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-16 mb-6" />

        <div className="flex flex-wrap items-center justify-between gap-4 text-overline text-bone-dim">
          <div>© {new Date().getFullYear()} Atelier Noir. Все права защищены.</div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            Принимаем заявки
          </div>
        </div>
      </div>
    </footer>
  );
};
