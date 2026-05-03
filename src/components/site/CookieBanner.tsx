import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const KEY = "ns_cookie_consent_v1";

export const CookieBanner = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!localStorage.getItem(KEY)) setOpen(true);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  const accept = () => {
    localStorage.setItem(KEY, "accepted");
    setOpen(false);
  };
  const decline = () => {
    localStorage.setItem(KEY, "declined");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 max-w-[calc(100vw-2rem)] md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[60]"
          role="dialog"
          aria-label="Согласие на использование cookies"
        >
          <div className="border border-gold/30 bg-ink/95 backdrop-blur-md p-5 md:p-6 shadow-elev relative">
            <div className="text-overline text-gold mb-2">Cookies</div>
            <p className="text-bone-dim text-sm leading-relaxed mb-4">
              Сайт использует файлы cookie для аналитики и улучшения опыта. Подробнее — в{" "}
              <Link to="/privacy" className="text-bone link-underline">
                политике конфиденциальности
              </Link>
              .
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={accept}
                className="bg-bone text-ink py-3 px-2 text-overline hover:bg-gold transition-colors duration-500"
              >
                Принять
              </button>
              <button
                onClick={decline}
                className="px-2 border border-hairline text-bone-dim py-3 text-overline hover:text-bone hover:border-bone-dim transition-colors duration-500"
              >
                Отклонить
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
