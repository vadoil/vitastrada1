import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1, "Укажите имя").max(100),
  brand: z.string().trim().min(1, "Укажите бренд").max(120),
  email: z.string().trim().email("Некорректный e-mail").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  volume: z.string().max(20).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) {
      toast.error("Подтвердите согласие на обработку персональных данных");
      return;
    }
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") ?? ""),
      brand: String(fd.get("brand") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      volume: String(fd.get("volume") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Проверьте поля");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("leads").insert({
      name: parsed.data.name,
      brand: parsed.data.brand,
      email: parsed.data.email,
      phone: parsed.data.phone || undefined,
      volume: parsed.data.volume || undefined,
      message: parsed.data.message || undefined,
      consent: true,
    });
    setSubmitting(false);

    if (error) {
      toast.error("Не удалось отправить. Попробуйте ещё раз.");
      return;
    }
    toast.success("Заявка отправлена. Свяжемся в течение 24 часов.");
    form.reset();
    setConsent(false);
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
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <span className="text-overline text-bone-dim shrink-0">Адрес</span>
                <span className="text-bone text-sm md:text-base text-right break-words min-w-0">Москва, ул. Производственная, 12</span>
              </div>
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <span className="text-overline text-bone-dim shrink-0">Телефон</span>
                <a href="tel:+74950000000" className="text-bone link-underline font-mono text-sm md:text-base">+7 495 000 00 00</a>
              </div>
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <span className="text-overline text-bone-dim shrink-0">E-mail</span>
                <a href="mailto:hello@novastrada.ru" className="text-bone link-underline text-sm md:text-base break-all min-w-0">hello@novastrada.ru</a>
              </div>
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <span className="text-overline text-bone-dim shrink-0">Часы</span>
                <span className="text-bone text-sm md:text-base">Пн – Пт · 10:00 – 19:00</span>
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
                    maxLength={255}
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

              <div className="border-b border-hairline px-6 py-5 group focus-within:bg-ink transition-colors">
                <label className="text-overline text-bone-dim block mb-2">О проекте</label>
                <textarea
                  name="message"
                  rows={4}
                  maxLength={2000}
                  placeholder="Что планируете шить, сроки, особенности…"
                  className="w-full bg-transparent text-bone text-base placeholder-bone-dim/40 outline-none border-0 resize-none"
                />
              </div>

              {/* Consent */}
              <div className="px-6 py-5 border-b border-hairline">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <span className="relative mt-[2px] inline-block">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="peer sr-only"
                    />
                    <span className="block h-4 w-4 border border-hairline peer-checked:bg-gold peer-checked:border-gold transition-colors" />
                  </span>
                  <span className="text-bone-dim text-xs leading-relaxed">
                    Отправляя заявку, я соглашаюсь на обработку персональных данных
                    в соответствии с{" "}
                    <Link to="/privacy" className="text-bone link-underline">
                      политикой конфиденциальности
                    </Link>
                    .
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting || !consent}
                className="btn-stitched w-full group bg-bone text-ink py-6 text-overline hover:bg-gold transition-colors duration-500 flex items-center justify-center gap-4 disabled:opacity-40 disabled:cursor-not-allowed"
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
