import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = {
  value: string; // e.g. "50+", "100%", "95+"
  duration?: number;
  className?: string;
};

// Parses "50+" -> { num: 50, suffix: "+" }, "100%" -> { num: 100, suffix: "%" }
function parse(v: string) {
  const m = v.match(/^(\d+)(.*)$/);
  if (!m) return { num: 0, suffix: v };
  return { num: parseInt(m[1], 10), suffix: m[2] };
}

export function CountUp({ value, duration = 1400, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const { num, suffix } = parse(value);
  const [display, setDisplay] = useState(reduce ? num : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(num * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, num, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
