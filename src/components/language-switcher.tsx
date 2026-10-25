import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { Globe, Check, ChevronDown } from "lucide-react";
import { LANGUAGES, URL_LANGUAGE_CODES, DEFAULT_LANGUAGE, type LanguageCode } from "@/i18n/languages";
import { cn } from "@/lib/utils";
import { useCurrentLang } from "@/lib/i18n-routing";

/**
 * Strip a leading language segment from a pathname (if any).
 *   /es/about  -> /about
 *   /ar        -> /
 *   /about     -> /about
 */
function stripLangPrefix(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 0 && (URL_LANGUAGE_CODES as string[]).includes(parts[0])) {
    const rest = "/" + parts.slice(1).join("/");
    return rest === "/" ? "/" : rest.replace(/\/$/, "");
  }
  return pathname;
}

function buildLocalizedPath(lang: LanguageCode, basePath: string, search: string, hash: string): string {
  const clean = basePath === "/" ? "" : basePath;
  const path = lang === DEFAULT_LANGUAGE ? (clean || "/") : `/${lang}${clean || "/"}`;
  return `${path}${search || ""}${hash || ""}`;
}

export function LanguageSwitcher({
  variant = "topbar",
  onLanguageChange,
}: {
  variant?: "topbar" | "drawer";
  onLanguageChange?: () => void;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const location = useRouterState({ select: (s) => s.location });
  const currentLang = useCurrentLang();
  const current = LANGUAGES.find((l) => l.code === currentLang) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const change = (code: LanguageCode) => {
    try {
      localStorage.setItem("dwd-language", code);
      // Mark that the user has made an explicit language choice so the
      // browser-language auto-redirect never overrides them again.
      localStorage.setItem("dwd-lang-choice", "manual");
    } catch {
      /* ignore */
    }
    const basePath = stripLangPrefix(location.pathname);
    const target = buildLocalizedPath(code, basePath, location.searchStr ?? "", location.hash ?? "");
    setOpen(false);
    // Use raw href navigation so we don't need to match TanStack's typed route table.
    router.history.push(target);
    onLanguageChange?.();
  };

  const isDrawer = variant === "drawer";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language.select")}
        className={cn(
          "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full transition-colors",
          isDrawer
            ? "border border-border/60 bg-card/60 px-3 py-2 text-sm text-foreground hover:bg-accent"
            : "px-2 py-0.5 text-[11px] text-brand-primary-foreground hover:bg-white/10 sm:text-xs",
        )}
      >
        <Globe className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span className="font-medium" suppressHydrationWarning>{current.native}</span>
        <ChevronDown
          className={cn("h-3 w-3 shrink-0 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t("language.select")}
          className={cn(
            "absolute z-50 mt-2 max-h-[70vh] w-56 overflow-auto rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-2xl ring-1 ring-black/5 animate-in fade-in zoom-in-95",
            isDrawer
              ? "ltr:left-0 rtl:right-0"
              : "ltr:right-0 rtl:left-0",
          )}
        >
          {LANGUAGES.map((l) => {
            const active = l.code === current.code;
            return (
              <button
                key={l.code}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => change(l.code)}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
                  active ? "bg-accent text-foreground" : "text-foreground/80 hover:bg-accent",
                )}
                dir={l.dir}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span aria-hidden className="text-base leading-none">{l.flag}</span>
                  <span className="truncate">
                    <span className="font-medium">{l.native}</span>
                    <span className="ml-1.5 text-xs text-muted-foreground">{l.label}</span>
                  </span>
                </span>
                {active && <Check className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
