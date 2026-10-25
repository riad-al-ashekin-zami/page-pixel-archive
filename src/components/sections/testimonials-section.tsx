import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

type Testimonial = { key: string; name: string };

const testimonials: Testimonial[] = [
  { key: "sarahM", name: "Dr. Sarah M." },
  { key: "rajK", name: "Dr. Raj K., MD" },
  { key: "jenniferL", name: "Jennifer L." },
  { key: "ameliaC", name: "Dr. Amelia C." },
  { key: "hanaS", name: "Dr. Hana S." },
  { key: "elliotN", name: "Dr. Elliot N., MD" },
];

function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/, "")
    .replace(/,.*$/, "")
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Card({ t, tr }: { t: Testimonial; tr: (k: string) => string }) {
  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.5)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#5cbdb9]/40 hover:bg-white/[0.06]">
      <Quote aria-hidden className="absolute right-6 top-6 h-6 w-6 text-brand-primary" />
      <div className="flex items-center gap-1 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <blockquote className="mt-5 flex-1 text-pretty text-[0.98rem] italic leading-relaxed text-white/85">
        {tr(`testimonials.items.${t.key}.quote`)}
      </blockquote>
      <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
        <span
          aria-hidden
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-primary/20 text-xs font-semibold text-brand-primary"
        >
          {initials(t.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{t.name}</p>
          <p className="truncate text-xs text-white/60">
            {tr(`testimonials.items.${t.key}.role`)}
            <span className="mx-1.5 opacity-40">·</span>
            {tr(`testimonials.items.${t.key}.practice`)}
          </p>
        </div>
      </div>
    </article>
  );
}

export function TestimonialsSection() {
  const { t: tr } = useTranslation("homeSections");
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setPerPage(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const pages = Math.ceil(testimonials.length / perPage);

  useEffect(() => {
    setPage((p) => Math.min(p, pages - 1));
  }, [pages]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setPage((p) => (p + 1) % pages), 7000);
    return () => clearInterval(id);
  }, [paused, pages]);

  const goPrev = () => setPage((p) => (p === 0 ? pages - 1 : p - 1));
  const goNext = () => setPage((p) => (p + 1) % pages);

  return (
    <section
      id="testimonials"
      className="relative isolate overflow-hidden py-20 text-white sm:py-24 lg:py-28"
      style={{
        background:
          "radial-gradient(900px 460px at 100% 0%, rgba(92,189,185,0.18), transparent 60%), radial-gradient(700px 400px at 0% 100%, rgba(45,138,158,0.22), transparent 60%), linear-gradient(180deg, #0c2340 0%, #081a31 60%, #050f22 100%)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary">
              <span className="tabular-nums opacity-60">06</span><span className="opacity-30">—</span>
              <Star className="h-3.5 w-3.5 fill-current" /> {tr("testimonials.eyebrow")}
            </span>
            <h2 className="mt-5 text-balance text-4xl font-light leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              {tr("testimonials.headingLead")}{" "}
              <span className="font-medium text-brand-primary">{tr("testimonials.headingHighlight")}</span>
            </h2>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={goPrev}
              aria-label={tr("testimonials.prevAria")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-brand-primary hover:text-brand-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label={tr("testimonials.nextAria")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-brand-primary hover:text-brand-primary"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden" dir="ltr">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {Array.from({ length: pages }).map((_, pi) => (
              <div
                key={pi}
                className="grid w-full shrink-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {testimonials
                  .slice(pi * perPage, pi * perPage + perPage)
                  .map((t) => (
                    <Card key={t.key} t={t} tr={tr} />
                  ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-label={tr("testimonials.goToSlide", { n: i + 1 })}
              className={`h-1.5 rounded-full transition-all ${
                i === page
                  ? "w-8 bg-brand-primary"
                  : "w-4 bg-white/20 hover:bg-brand-primary/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
