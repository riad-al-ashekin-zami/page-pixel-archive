import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

function useDesktopTablet() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setOk(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return ok;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade-up" | "fade" | "scale" | "slide-left" | "slide-right";
  as?: "div" | "section" | "li" | "article";
};

const variantMap: Record<string, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.97 },
    show: { opacity: 1, scale: 1 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -24 },
    show: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 24 },
    show: { opacity: 1, x: 0 },
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "fade-up",
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const enabled = useDesktopTablet();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce || !mounted || !enabled) {
    const Tag = as as "div";
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={false}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={variantMap[variant]}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol" | "section";
};

export function RevealStagger({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: StaggerProps) {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const enabled = useDesktopTablet();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce || !mounted || !enabled) {
    const Tag = as as "div";
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={false}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  variant = "fade-up",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  variant?: "fade-up" | "fade" | "scale";
  as?: "div" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const enabled = useDesktopTablet();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce || !mounted || !enabled) {
    const Tag = as as "div";
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={className} initial="show" variants={variantMap[variant]} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </MotionTag>
  );
}
