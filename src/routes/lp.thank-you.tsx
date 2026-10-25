import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, Home, Clock, Star, Quote } from "lucide-react";

export const Route = createFileRoute("/lp/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank You — We'll Be In Touch Within 24 Hours" },
      { name: "description", content: "Your request has been received. Our team will reach out within 24 hours." },
      { name: "robots", content: "noindex,follow" },
      { name: "googlebot", content: "noindex, nofollow" },
    ],
  }),
  component: ThankYouPage,
});

const REDIRECT_SECONDS = 10;
const HOMEPAGE = "https://dermatologywebsitedesign.com";

function ThankYouPage() {
  const [seconds, setSeconds] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    if (seconds <= 0) {
      window.location.href = HOMEPAGE;
      return;
    }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const pct = ((REDIRECT_SECONDS - seconds) / REDIRECT_SECONDS) * 100;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0c2340] via-[#0a1c38] to-[#050f22] px-4 py-10 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/15 bg-white/5 p-8 text-center shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)] backdrop-blur sm:p-12">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 shadow-[0_20px_50px_-10px_rgba(45,212,191,0.6)]">
          <CheckCircle2 className="h-10 w-10 text-[#0c2340]" strokeWidth={2.5} />
        </div>

        <h1 className="mt-8 text-balance text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          Thank You! Your Request Has Been{" "}
          <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text font-medium text-transparent">
            Received
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
          Our dermatology website specialists will reach out within{" "}
          <span className="font-semibold text-teal-300">24 hours</span> with your free consultation and custom mockup.
        </p>

        <div className="mx-auto mt-8 grid max-w-md gap-3 text-left">
          {[
            "You'll receive a confirmation email shortly",
            "Our team will call you within 1 business day",
            "Your free website mockup arrives in 48 hours",
          ].map((line) => (
            <div key={line} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/90">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
              {line}
            </div>
          ))}
        </div>

        {/* Countdown */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">
            <Clock className="h-4 w-4" /> Redirecting to homepage in
          </div>
          <div className="mt-3 text-5xl font-light tabular-nums text-white sm:text-6xl">
            {seconds}<span className="text-2xl text-white/60">s</span>
          </div>
          <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 transition-all duration-1000 ease-linear"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`${HOMEPAGE}/dermatology-websites-portfolio`}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 px-7 py-3.5 text-sm font-semibold text-[#0c2340] shadow-[0_20px_50px_-15px_rgba(45,212,191,0.6)] transition-transform hover:-translate-y-0.5"
          >
            Explore Our Work
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={HOMEPAGE}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
          >
            <Home className="h-4 w-4" /> Skip &amp; Go to Homepage
          </a>
        </div>

        {/* Mini testimonial while they wait */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[0,1,2,3,4].map((i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-teal-300 text-teal-300" />
              ))}
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-200">5.0 · Verified Client</span>
          </div>
          <div className="mt-3 flex gap-3">
            <Quote className="h-6 w-6 shrink-0 text-teal-300/60" />
            <p className="text-sm italic leading-relaxed text-white/85">
              "Best investment we made this year. New patient bookings tripled in the first quarter after launch. The team just gets dermatology."
            </p>
          </div>
          <div className="mt-3 pl-9 text-xs text-white/60">— Dr. Sarah Chen, Dermatology Clinic Director</div>
        </div>

        <p className="mt-6 text-xs text-white/50">
          Need immediate help? Email{" "}
          <a href="mailto:info@dermatologywebsitedesign.com" className="underline hover:text-white">
            info@dermatologywebsitedesign.com
          </a>
        </p>
      </div>
    </div>
  );
}
