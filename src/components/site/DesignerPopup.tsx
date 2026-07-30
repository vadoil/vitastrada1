import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const ease = [0.22, 1, 0.36, 1] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Укажите имя").max(100),
  phone: z.string().trim().min(6, "Укажите телефон").max(40),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

const STORAGE_KEY = "ns_designer_popup_seen";

export const DesignerPopup = () => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => setOpen(true), 25000);

    const onScroll = () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled > 0.35) {
        setOpen(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-designer-form", onOpen);
    return () => window.removeEventListener("open-designer-form", onOpen);
  }, []);

  const close = () => {
    setOpen(false);
    localStorage.setItem(STORAGE_KEY, "1");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) {
      toast.error("Подтвердите согласие на обработку персональных данных");
      return;
    }
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Проверьте поля");
      return;
    }

    setSubmitting(true);
    const payload = {
      name: parsed.data.name,
      email: "",
      phone: parsed.data.phone,
      volume: "5–30",
      message: parsed.data.message || undefined,
      consent: true,
      source: "designer",
    };

    const { error } = await supabase.from("leads").insert(payload);
    if (!error) {
      supabase.functions.invoke("notify-lead", { body: { ...payload, consent: undefined } });
    }
    setSubmitting(false);

    if (error) {
      toast.error("Не удалось отправить. Попробуйте ещё раз.");
      return;
    }
    setDone(true);
    localStorage.setItem(STORAGE_KEY, "1");
    toast.success("Заявка отправлена. Свяжемся в течение 24 часов.");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={close} />

          <motion.div
            className="relative w-full max-w-xl max-h-[94vh] overflow-y-auto bg-ink-soft border border-hairline noise"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease }}
          >
            <button
              onClick={close}
              aria-label="Закрыть"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center border border-hairline text-bone-dim hover:text-bone hover:border-bone transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>

            {done ? (
              <div className="px-6 py-16 sm:px-12 text-center">
                <div className="text-overline text-gold mb-4">— Принято</div>
                <h3 className="font-display text-editorial-md text-bone mb-4">
                  Спасибо!
                </h3>
                <p className="text-bone-dim">
                  Мы свяжемся в течение 24 часов и пришлём условия для молодых дизайнеров.
                </p>
              </div>
            ) : (
              <div className="p-5 sm:p-8">
                <div className="text-overline text-gold mb-2">— Молодым дизайнерам</div>
                <h3 className="font-display text-xl sm:text-3xl text-bone leading-tight mb-2 pr-10">
                  Специальные цены на <span className="italic text-bone-dim">первую коллекцию</span>
                </h3>
                <p className="text-bone-dim text-xs sm:text-sm leading-relaxed mb-4">
                  Отшиваем от <span className="text-bone">5 единиц</span>, помогаем с лекалами
                  и подбором ткани.
                </p>

                <div className="grid grid-cols-3 gap-px bg-hairline border border-hairline mb-4">
                  {[
                    { k: "−20%", v: "лекала" },
                    { k: "от 5 ед.", v: "партия" },
                    { k: "0 ₽", v: "технолог" },
                  ].map((x) => (
                    <div key={x.k} className="bg-ink-soft px-2 py-3 text-center sm:text-left sm:px-4">
                      <div className="font-display text-base sm:text-lg text-gold">{x.k}</div>
                      <div className="text-overline text-bone-dim text-[10px] mt-0.5">{x.v}</div>
                    </div>
                  ))}
                </div>

                <form onSubmit={onSubmit} className="border border-hairline">
                  <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-px sm:bg-hairline">
                    {[
                      { name: "name", label: "Имя", type: "text" },
                      { name: "phone", label: "Телефон", type: "tel" },
                    ].map((f) => (
                      <div key={f.name} className="bg-ink-soft border-b border-hairline sm:border-b-0 px-4 py-2.5 focus-within:bg-ink transition-colors">
                        <label className="text-overline text-bone-dim block text-[10px]">
                          {f.label}
                          <span className="text-gold">*</span>
                        </label>
                        <input
                          type={f.type}
                          name={f.name}
                          required
                          maxLength={255}
                          className="w-full bg-transparent text-bone text-base outline-none border-0"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="border-y border-hairline px-4 py-2.5 focus-within:bg-ink transition-colors">
                    <label className="text-overline text-bone-dim block text-[10px]">Что хотите отшить</label>
                    <textarea
                      name="message"
                      rows={2}
                      maxLength={2000}
                      className="w-full bg-transparent text-bone text-base outline-none border-0 resize-none"
                    />
                  </div>
                  <div className="px-4 py-3 border-b border-hairline">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <span className="relative mt-[2px] inline-block">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="peer sr-only"
                        />
                        <span className="block h-4 w-4 border border-hairline peer-checked:bg-gold peer-checked:border-gold transition-colors" />
                      </span>
                      <span className="text-bone-dim text-[11px] leading-snug">
                        Согласен на обработку персональных данных согласно ФЗ-152 и{" "}
                        <Link to="/privacy" className="text-bone link-underline" onClick={close}>
                          политике конфиденциальности
                        </Link>
                        .
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || !consent}
                    className="btn-stitched w-full bg-bone text-ink py-3.5 text-overline hover:bg-gold transition-colors duration-500 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Отправляем…" : "Получить условия"}
                  </button>

                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
