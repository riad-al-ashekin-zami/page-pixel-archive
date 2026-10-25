import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, useRouter, useRouterState, HeadContent, Scripts } from "@tanstack/react-router";
import { LocalLink as Link } from "@/components/local-link";
import { useEffect, useReducer, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ChatWidget } from "@/components/chatbot/chat-widget";
import { Preloader } from "@/components/preloader";
import "@/i18n";
import { applyHtmlLangAndDir } from "@/i18n";
import { useTranslation } from "react-i18next";
import { URL_LANGUAGE_CODES } from "@/i18n/languages";
import { installTextNormalizationObserver } from "@/lib/text-normalize";

const earlyTextNormalizerScript = `(() => {
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  const replacements = [
    [/عيادة\\s+ميريديان\\s+الجلدية/gi, "MS Clinic"],
    [/مجموعة\\s+نورث\\s+شور\\s+لطب\\s+الجلد(?:ية)?/gi, "ND Group"],
    [/مجموعة\\s+نورث\\s+شور\\s+ل(?:طب\\s+)?(?:الأمراض\\s+)?الجلد(?:ية)?/gi, "ND Group"],
    [/كاسكيد\\s+لجراحة\\s+موهس\\s+والجراحة\\s+الجلدية/gi, "CM Surgical"],
    [/كاسكيد\\s+لجراحة\\s+موهس\\s+والجلدية/gi, "CM Surgical"],
    [/كاسكيد\\s+لجراحة\\s+موهس/gi, "CM Surgical"],
    [/كاسكيد\\s+لطب\\s+جلد\\s+الأطفال/gi, "CP Dermatology"],
    [/كوهلي\\s+لجلدية\\s+الأطفال/gi, "KP Dermatology"],
    [/كوهلي\\s+ل(?:طب\\s+)?جلد(?:ية)?\\s+الأطفال/gi, "KP Dermatology"],
    [/نورث\\s+لايت\\s+لطب\\s+الجلدية/gi, "NL Dermatology"],
    [/نورث\\s+لايت\\s+ل(?:طب\\s+)?الجلد(?:ية)?/gi, "NL Dermatology"],
    [/نورث\\s+باي\\s+سكين\\s+آند\\s+ليزر/gi, "NBS Laser"],
    [/بيكون\\s+هيل\\s+للأمراض\\s+الجلدية/gi, "BH Dermatology"],
    [/عيادة\\s+Clear\\s+Skin\\s+لطب\\s+الجلد/gi, "CS Dermatology"],
    [/معهد\\s+البشرة\\s+المشرقة/gi, "RS Institute"],
    [/معهد\\s+راديانت\\s+ل(?:لبشرة|لجلد(?:ية)?|ل(?:طب\\s+)?الجلد(?:ية)?)/gi, "RS Institute"],
    [/لومن\\s+لطب\\s+الجلدية\\s+التجميلي/gi, "LA Dermatology"],
    [/ليومن\\s+لطب\\s+الجلدية\\s+التجميلي/gi, "LA Dermatology"],
    [/لومين\\s+لتجميل\\s+الجلد/gi, "LA Dermatology"],
    [/لومين\\s+للتجميل/gi, "LA Dermatology"],
    [/عيادة\\s+سكين\\s+كير/gi, "SC Associates"],
    [/Klinika\\s+Skóry\\s+Meridian/gi, "MS Clinic"],
    [/Meridian\\s+(?:Skin\\s+Clinic|Dermatology)/gi, "MS Clinic"],
    [/(?:grupo\\s+dermatológico\\s+)?Northshore\\s+Dermatology\\s+Group/gi, "ND Group"],
    [/grupo\\s+dermatológico\\s+Northshore/gi, "ND Group"],
    [/Summit\\s+Mohs\\s+&\\s+Surgical/gi, "SM Surgical"],
    [/قمة\\s+موهس\\s+للجراحة\\s+الجلدية/gi, "SM Surgical"],
    [/مركز\\s+قمة\\s+موهس\\s+للجراحة\\s+الجلدية/gi, "SM Surgical"],
    [/Summit\\s+Dermatology\\s+Partners/gi, "SD Partners"],
    [/شركاء\\s+ساميت\\s+للأمراض\\s+الجلدية/gi, "SD Partners"],
    [/Cascade\\s+Mohs\\s+&\\s+Surgical/gi, "CM Surgical"],
    [/Cascade\\s+Pediatric\\s+Dermatology/gi, "CP Dermatology"],
    [/Cascade\\s+Pediatric\\s+Derm\\b/gi, "CP Dermatology"],
    [/\\bCP\\s+Derm\\b/gi, "CP Dermatology"],
    [/Kohli\\s+Pediatric\\s+Derm(?:atology)?/gi, "KP Dermatology"],
    [/Northlight\\s+Dermatology/gi, "NL Dermatology"],
    [/North\\s+Bay\\s+Skin\\s+(?:&|and)\\s+Laser/gi, "NBS Laser"],
    [/Beacon\\s+Hill\\s+Dermatology/gi, "BH Dermatology"],
    [/Highland\\s+Dermatology\\s+Group/gi, "HD Group"],
    [/Bright\\s+Skin\\s+Dermatology/gi, "BS Dermatology"],
    [/Clear\\s+Skin\\s+Dermatology/gi, "CS Dermatology"],
    [/Pediatric\\s+Skin\\s+Partners/gi, "PS Partners"],
    [/Instituto\\s+Dermatológico\\s+Radiant/gi, "RS Institute"],
    [/Radiant\\s+Skin\\s+Institute/gi, "RS Institute"],
    [/Radiant\\s+Derm\\b/gi, "RS Institute"],
    [/Lumen\\s+Aesthetic\\s+Dermatology/gi, "LA Dermatology"],
    [/Lumen\\s+Aesthetic\\b/gi, "LA Dermatology"],
    [/SkinCare\\s+Associates/gi, "SC Associates"],
    [/Skin\\s+Care\\s+Associates/gi, "SC Associates"],
    [/Harbor\\s+Valley\\s+Dermatology/gi, "HV Dermatology"],
  ];
  const localizedAbbreviations = {
    ar: {
      "MS Clinic": "إم إس كلينك",
      "ND Group": "مجموعة إن دي",
      "SM Surgical": "إس إم للجراحة",
      "SD Partners": "إس دي بارتنرز",
      "CM Surgical": "سي إم للجراحة",
      "CP Dermatology": "سي بي ديرماتولوجي",
      "KP Dermatology": "كي بي ديرماتولوجي",
      "NL Dermatology": "إن إل ديرماتولوجي",
      "NBS Laser": "إن بي إس ليزر",
      "BH Dermatology": "بي إتش ديرماتولوجي",
      "HD Group": "مجموعة إتش دي",
      "BS Dermatology": "بي إس ديرماتولوجي",
      "CS Dermatology": "سي إس ديرماتولوجي",
      "PS Partners": "بي إس بارتنرز",
      "RS Institute": "آر إس إنستيتيوت",
      "LA Dermatology": "إل إيه ديرماتولوجي",
      "SC Associates": "إس سي أسوشيتس",
      "HV Dermatology": "إتش في ديرماتولوجي",
      "MM Center": "إم إم سنتر",
    }
  };
  const skip = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT", "SELECT", "OPTION", "CODE", "PRE"]);
  const normalize = (value) => {
    let next = value;
    for (const [pattern, replacement] of replacements) next = next.replace(pattern, replacement);
    const labelMap = localizedAbbreviations[document.documentElement.lang];
    if (labelMap) {
      for (const [canonical, localized] of Object.entries(labelMap)) {
        next = next.split(canonical).join(localized);
      }
    }
    const lower = next.toLowerCase();
    const isTechnical = ["http:", "https:", "mailto:", "tel:", "sms:", "whatsapp:", "/", "#"].some((prefix) => lower.startsWith(prefix));
    if (document.documentElement.lang === "ar" && !isTechnical) {
      next = next
        .replace(/\\d/g, (d) => arabicDigits[Number(d)] || d)
        .replace(/([٠-٩]),(?=[٠-٩])/g, "$1٬")
        .replace(/([٠-٩])\\.(?=[٠-٩])/g, "$1٫");
    }
    return next;
  };
  const attrs = ["alt", "aria-description", "aria-label", "content", "placeholder", "title"];
  const normalizeText = (node) => {
    const parent = node.parentElement;
    if (!parent || skip.has(parent.tagName) || parent.closest("[data-no-text-normalize]")) return;
    const current = node.nodeValue || "";
    const next = normalize(current);
    if (next !== current) node.nodeValue = next;
  };
  const normalizeAttrs = (element) => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE || element.closest("[data-no-text-normalize]")) return;
    for (const attr of attrs) {
      const current = element.getAttribute(attr);
      if (!current) continue;
      const next = normalize(current);
      if (next !== current) element.setAttribute(attr, next);
    }
  };
  const normalizeTree = (root) => {
    if (root.nodeType === Node.TEXT_NODE) return normalizeText(root);
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
    if (root.nodeType === Node.ELEMENT_NODE) normalizeAttrs(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let current;
    while ((current = walker.nextNode())) normalizeText(current);
    const elementWalker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
    while ((current = elementWalker.nextNode())) normalizeAttrs(current);
  };
  normalizeTree(document.body);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "characterData") normalizeText(mutation.target);
      if (mutation.type === "attributes") normalizeAttrs(mutation.target);
      mutation.addedNodes.forEach(normalizeTree);
    }
  }).observe(document.body, { attributes: true, attributeFilter: attrs, childList: true, characterData: true, subtree: true });
})();`;

function NotFoundComponent() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t("errorPages.notFound.title")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("errorPages.notFound.description")}
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("errorPages.actions.home")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { t } = useTranslation();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {t("errorPages.error.title")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("errorPages.error.description")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("errorPages.actions.retry")}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {t("errorPages.actions.home")}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dermatology Website Design — HIPAA-Aware Growth Platforms" },
      { name: "description", content: "HIPAA-aware websites, SEO, and marketing for dermatology practices. Free website audit in 24 hours." },
      { name: "author", content: "Dermatology Website Design" },
      { property: "og:site_name", content: "Dermatology Website Design" },
      { property: "og:title", content: "Dermatology Website Design — HIPAA-Aware Growth Platforms" },
      { property: "og:description", content: "HIPAA-aware websites, SEO, and marketing for dermatology practices. Free website audit in 24 hours." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Dermatology Website Design — HIPAA-Aware Growth Platforms" },
      { name: "twitter:description", content: "HIPAA-aware websites, SEO, and marketing for dermatology practices. Free website audit in 24 hours." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/6625be73-cd9f-4bff-8690-cc040752ae00" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/6625be73-cd9f-4bff-8690-cc040752ae00" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap" },
    ],
    scripts: [
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-LVYPK8QWFV",
      },
      {
        children: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-LVYPK8QWFV');`,
      },
      {
        children: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","xplky3flwg");`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  // Derive URL language at SSR so crawlers see the correct <html lang/dir>.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const first = pathname.split("/").filter(Boolean)[0];
  const urlLang = first && (URL_LANGUAGE_CODES as string[]).includes(first) ? first : "en";
  const dir = urlLang === "ar" ? "rtl" : "ltr";
  return (
    <html lang={urlLang} dir={dir}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <script dangerouslySetInnerHTML={{ __html: earlyTextNormalizerScript }} />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { i18n } = useTranslation();
  // Detect the URL language from the pathname (first segment) and keep i18n in sync.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const urlLang = (() => {
    const first = pathname.split("/").filter(Boolean)[0];
    return first && (URL_LANGUAGE_CODES as string[]).includes(first) ? first : "en";
  })();

  // Force a re-render of all i18n-subscribed descendants whenever the
  // language changes. react-i18next's built-in `languageChanged` re-render
  // is unreliable under `useSuspense:false`, so we bump a counter and pass
  // the current language as `key` on the subtree to guarantee a remount
  // if the changeLanguage event fires after initial mount.
  const [, forceTick] = useReducer((n: number) => n + 1, 0);

  // Sync i18n language synchronously during render — resources are preloaded
  // via eager glob so changeLanguage resolves immediately, and this avoids the
  // "useEffect fires after first paint" flicker that leaves initial content in
  // the wrong language.
  if (i18n.resolvedLanguage !== urlLang) {
    void i18n.changeLanguage(urlLang);
  }

  useEffect(() => {
    applyHtmlLangAndDir(urlLang);
  }, [urlLang]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    return installTextNormalizationObserver(document.body, urlLang);
  }, [pathname, urlLang]);

  useEffect(() => {
    const cb = () => forceTick();
    i18n.on("languageChanged", cb);
    return () => {
      i18n.off("languageChanged", cb);
    };
  }, [i18n]);

  // Browser-language auto-detect: on first visit at English root ("/"),
  // sniff navigator.languages, map to a supported non-English locale, and
  // redirect once. Skipped if user already navigated to any locale prefix,
  // if they've explicitly chosen a language before (localStorage flag),
  // or when running under SSR.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (urlLang !== "en") return; // already on a localized route
    if (pathname !== "/" && !pathname.startsWith("/?")) return; // only auto-redirect from home
    try {
      if (window.localStorage.getItem("dwd-lang-choice")) return;
    } catch {}
    const prefs = (navigator.languages ?? [navigator.language ?? ""]).map((l) =>
      l.toLowerCase().split("-")[0],
    );
    const pick = prefs.find((p) => (URL_LANGUAGE_CODES as string[]).includes(p));
    if (!pick) return;
    try {
      window.localStorage.setItem("dwd-lang-choice", "auto");
    } catch {}
    window.location.replace(`/${pick}/${window.location.search}${window.location.hash}`);
  }, [pathname, urlLang]);


  return (
    <QueryClientProvider client={queryClient}>
      {/* Keying the tree on the active language guarantees every i18n-subscribed
          component re-reads translations after a language switch. */}
      <div key={i18n.resolvedLanguage ?? urlLang} className="contents">
        <Preloader />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        {!pathname.startsWith("/lp") && <ChatWidget />}
      </div>
    </QueryClientProvider>
  );
}
