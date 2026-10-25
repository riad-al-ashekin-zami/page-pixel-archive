import { forwardRef, type AnchorHTMLAttributes } from "react";
import { Link } from "@tanstack/react-router";
import { useCurrentLang } from "@/lib/i18n-routing";
import { localizedPath } from "@/lib/i18n-routing";

type LocalLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  [key: string]: any;
  /** English-canonical logical path, e.g. "/about" or "/blog/foo". */
  to: string;
  /** Force a specific language (rare — usually the current URL language is right). */
  lang?: string;
  /** Optional URL hash (without the leading '#'). */
  hash?: string;
  activeProps?: { className?: string };
  inactiveProps?: { className?: string };
  preload?: false | "intent" | "viewport" | "render";
};

/**
 * <LocalLink> — SPA navigation that automatically preserves the URL language.
 *
 * Pass the English-canonical path via `to`; the component prefixes the current
 * language when appropriate (`/about` → `/es/about` under `es`).
 */
export const LocalLink = forwardRef<HTMLAnchorElement, LocalLinkProps>(function LocalLink(
  { to, lang, hash, params, activeProps, inactiveProps, preload = "intent", ...rest },
  ref,
) {
  const currentLang = useCurrentLang();
  const effectiveLang = (lang as ReturnType<typeof useCurrentLang>) ?? currentLang;
  const resolvedTo = params
    ? Object.entries(params).reduce(
        (path, [key, value]) => path.replace(`$${key}`, encodeURIComponent(String(value ?? ""))),
        to,
      )
    : to;
  const href = resolvedTo === "." || resolvedTo === ".." ? resolvedTo : localizedPath(effectiveLang, resolvedTo);
  return (
    <Link
      // TanStack Router's typed `to` prop expects the union of file-based routes.
      // Localized paths are runtime-valid but not part of that union, so cast.
      to={href as never}
      hash={hash}
      preload={preload}
      activeProps={activeProps}
      inactiveProps={inactiveProps}
      ref={ref}
      {...rest}
    />
  );
});
