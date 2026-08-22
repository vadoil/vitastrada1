import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import j1 from "@/assets/journal-1.webp";
import j2 from "@/assets/journal-2.webp";
import j3 from "@/assets/journal-3.webp";

type Item = {
  id: string;
  title: string;
  chapter: string | null;
  duration: string | null;
  cover_url: string | null;
  video_url: string | null;
};

const DEMO: Item[] = [
  {
    id: "d1",
    title: "Пальто-халат: посадка, которая держит форму",
    duration: "06:42",
    chapter: "Эпизод 03",
    cover_url: j1,
    video_url: null,
  },
  {
    id: "d2",
    title: "Тренч: 42 операции от лекала до готового изделия",
    duration: "11:18",
    chapter: "Эпизод 02",
    cover_url: j2,
    video_url: null,
  },
  {
    id: "d3",
    title: "Вечернее платье: корсетная основа и работа с шёлком",
    duration: "08:55",
    chapter: "Эпизод 01",
    cover_url: j3,
    video_url: null,
  },
];

const Card = ({ v, onPlay }: { v: Item; onPlay: (v: Item) => void }) => (
  <article
    className="group bg-ink cursor-pointer overflow-hidden"
    onClick={() => v.video_url && onPlay(v)}
  >
    <div className="relative aspect-[4/5] overflow-hidden">
      {v.cover_url ? (
        <img
          src={v.cover_url}
          alt={v.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover contrast-[1.2] saturate-[1.05] group-hover:scale-105 transition-all duration-[1.4s]"
        />
      ) : v.video_url ? (
        <video
          src={v.video_url}
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-14 w-14 md:h-20 md:w-20 rounded-full border border-bone/40 flex items-center justify-center backdrop-blur-sm bg-ink/30 group-hover:bg-bone group-hover:text-ink transition-all duration-500">
          <svg width="16" height="18" viewBox="0 0 18 20" fill="currentColor">
            <path d="M0 0L18 10L0 20V0Z" />
          </svg>
        </div>
      </div>

      <div className="absolute top-4 left-4 right-4 md:top-6 md:left-6 md:right-6 flex items-start justify-between gap-2">
        <span className="text-overline text-bone">{v.chapter}</span>
        {v.duration && (
          <span className="font-mono text-overline text-bone bg-ink/60 px-2 py-1 backdrop-blur-sm">
            {v.duration}
          </span>
        )}
      </div>

      <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
        <h3 className="text-bone text-base md:text-2xl font-display leading-tight">
          {v.title}
        </h3>
      </div>
    </div>
  </article>
);

export const Journal = () => {
  const [items, setItems] = useState<Item[] | null>(null);
  const [active, setActive] = useState<Item | null>(null);
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase
      .from("journal_media")
      .select("id,title,chapter,duration,cover_url,video_url")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => setItems((data as Item[]) ?? []));
  }, []);

  const live = items ?? [];
  const hasLive = live.length > 0;
  const list = hasLive ? live : DEMO;

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section id="journal" className="bg-ink-soft py-20 md:py-28 border-t border-hairline">
      <div className="container-editorial">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 md:mb-16">
          <div>
            <div className="text-overline text-gold mb-5">— 010</div>
            <h2 className="text-editorial-lg text-bone font-display">
              Журнал <span className="italic text-bone-dim">производства</span>
            </h2>
          </div>
          <a href="#" className="text-overline text-bone link-underline">
            Все эпизоды
          </a>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-px bg-hairline border border-hairline">
          {list.map((v) => (
            <Card key={v.id} v={v} onPlay={setActive} />
          ))}
        </div>

        {/* Mobile: сетка по 2 когда есть материалы из цеха, иначе карусель */}
        {hasLive ? (
          <div className="md:hidden grid grid-cols-2 gap-px bg-hairline border border-hairline">
            {list.map((v) => (
              <Card key={v.id} v={v} onPlay={setActive} />
            ))}
          </div>
        ) : (
          <div className="md:hidden">
            <div
              ref={trackRef}
              onScroll={onScroll}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-6 px-6"
              style={{ scrollbarWidth: "none" }}
            >
              {list.map((v) => (
                <div key={v.id} className="min-w-full snap-center pr-0">
                  <div className="border border-hairline">
                    <Card v={v} onPlay={setActive} />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 mt-6">
              {list.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Эпизод ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-[6px] rounded-full transition-all ${
                    i === index ? "w-6 bg-gold" : "w-[6px] bg-bone/30"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {active?.video_url && (
        <div
          className="fixed inset-0 z-50 bg-ink/95 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <video
            src={active.video_url}
            controls
            autoPlay
            playsInline
            className="max-h-[85vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};
