import { useState } from "react";
import { toast } from "sonner";

export const Contact = () => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Заявка отправлена. Свяжемся в течение 24 часов.");
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <section id="contact" className="relative bg-ink py-28 md:py-40 border-t border-hairline overflow-hidden noise">
      <div className="container-editorial relative">
        <div className="grid grid-cols-12 gap-10">
          {/* Left — manifesto */}
          <div className="col-span-12 lg:col-span-6">
            <div className="text-overline text-gold mb-8">— 011 · Заявка</div>
            <h2 className="text-editorial-lg text-bone font-display mb-8">
              Готовы обсудить <span className="italic text-bone-dim">вашу коллекцию?</span>
            </h2>
            <p className="text-bone-dim text-lg leading-relaxed max-w-lg mb-12">
              Расскажите о проекте — пришлём калькуляцию и презентацию производства в течение 24 часов. NDA подписываем до получения материалов.
            </p>

            <div className="space-y-6 border-t border-hairline pt-8">
              <div className="flex items-baseline justify-between">
                <span className="text-overline text-bone-dim">Адрес</span>
                <span className="text-bone text-base">Москва, ул. Производственная, 12</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-overline text-bone-dim">Телефон</span>
                <a href="tel:+74950000000" className="text-bone link-underline font-mono">+7 495 000 00 00</a>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-overline text-bone-dim">E-mail</span>
                <a href="mailto:hello@ateliernoir.ru" className="text-bone link-underline">hello@ateliernoir.ru</a>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-overline text-bone-dim">Часы</span>
                <span className="text-bone text-base">Пн – Пт · 10:00 – 19:00</span>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="col-span-12 lg:col-span-6">
            <form onSubmit={onSubmit} className="space-y-0 border border-hairline bg-ink-soft">
              {[
                { name: "name", label: "Имя", type: "text", required: true },
                { name: "brand", label: "Бренд", type: "text", required: true },
                { name: "email", label: "E-mail", type: "email", required: true },
                { name: "phone", label: "Телефон", type: "tel" },
              ].map((f) => (
                <div key={f.name} className="border-b border-hairline px-6 py-5 group focus-within:bg-ink transition-colors">
                  <label className="text-overline text-bone-dim block mb-2">{f.label}{f.required && <span className="text-gold">*</span>}</label>
                  <input
                    type={f.type}
                    name={f.name}
                    required={f.required}
                    className="w-full bg-transparent text-bone text-lg placeholder-bone-dim/40 outline-none border-0"
                  />
                </div>
              ))}

              <div className="border-b border-hairline px-6 py-5 group focus-within:bg-ink transition-colors">
                <label className="text-overline text-bone-dim block mb-3">Объём партии</label>
                <div className="flex flex-wrap gap-2">
                  {["30–50", "50–200", "200–1000", "1000+"].map((v) => (
                    <label key={v} className="cursor-pointer">
                      <input type="radio" name="volume" value={v} className="peer sr-only" defaultChecked={v === "50–200"} />
                      <span className="block px-4 py-2 text-overline border border-hairline text-bone-dim peer-checked:bg-bone peer-checked:text-ink peer-checked:border-bone hover:text-bone transition-all">
                        {v}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="px-6 py-5 group focus-within:bg-ink transition-colors">
                <label className="text-overline text-bone-dim block mb-2">О проекте</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Что планируете шить, сроки, особенности…"
                  className="w-full bg-transparent text-bone text-base placeholder-bone-dim/40 outline-none border-0 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-stitched w-full group bg-bone text-ink py-6 text-overline hover:bg-gold transition-colors duration-500 flex items-center justify-center gap-4 disabled:opacity-50"
              >
                {submitting ? "Отправляем…" : "Отправить заявку"}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform duration-500">
                  <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
