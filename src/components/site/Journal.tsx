import j1 from "@/assets/journal-1.jpg";
import j2 from "@/assets/journal-2.jpg";
import j3 from "@/assets/journal-3.jpg";

const VIDEOS = [
  {
    title: "Пальто-халат: посадка, которая держит форму",
    duration: "06:42",
    chapter: "Эпизод 03",
    image: j1,
  },
  {
    title: "Тренч: 42 операции от лекала до готового изделия",
    duration: "11:18",
    chapter: "Эпизод 02",
    image: j2,
  },
  {
    title: "Вечернее платье: корсетная основа и работа с шёлком",
    duration: "08:55",
    chapter: "Эпизод 01",
    image: j3,
  },
];

export const Journal = () => {
  return (
    <section id="journal" className="bg-ink-soft py-20 md:py-28 border-t border-hairline">
      <div className="container-editorial">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 md:col-span-3">
            <div className="text-overline text-gold">— 010</div>
          </div>
          <div className="col-span-12 md:col-span-9 flex items-end justify-between flex-wrap gap-6">
            <h2 className="text-editorial-lg text-bone font-display max-w-3xl">
              Журнал <span className="italic text-bone-dim">производства</span>
            </h2>
            <a href="#" className="text-overline text-bone link-underline">
              Все эпизоды
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-hairline border border-hairline">
          {VIDEOS.map((v, i) => (
            <article key={i} className="group bg-ink cursor-pointer overflow-hidden">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={v.image}
                  alt={v.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover contrast-[1.2] saturate-[1.05] group-hover:scale-105 transition-all duration-[1.4s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />


                {/* Play */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full border border-bone/40 flex items-center justify-center backdrop-blur-sm bg-ink/30 group-hover:bg-bone group-hover:text-ink transition-all duration-500">
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="currentColor">
                      <path d="M0 0L18 10L0 20V0Z" />
                    </svg>
                  </div>
                </div>

                <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                  <span className="text-overline text-bone">{v.chapter}</span>
                  <span className="font-mono text-overline text-bone bg-ink/60 px-2 py-1 backdrop-blur-sm">
                    {v.duration}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-bone text-xl md:text-2xl font-display leading-tight">
                    {v.title}
                  </h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
