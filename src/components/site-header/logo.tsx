
import { LocalLink } from "@/components/local-link";
import logoLight from "@/assets/dermwd-logo.png.asset.json";
import logoDark from "@/assets/dermwd-logo-dark.png.asset.json";

export function Logo() {
  return (
    <LocalLink
      to="/"
      className="inline-flex shrink-0 items-center rounded-md outline-none ring-offset-background transition-transform focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 hover:scale-[1.02]"
      aria-label="Dermatology Website Design — Home"
    >
      <img
        src={logoLight.url}
        alt="Dermatology Website Design"
        className="block h-7 w-auto sm:h-8 lg:h-9 dark:hidden"
        loading="eager"
        decoding="async"
      />
      <img
        src={logoDark.url}
        alt="Dermatology Website Design"
        className="hidden h-7 w-auto sm:h-8 lg:h-9 dark:block"
        loading="eager"
        decoding="async"
      />
    </LocalLink>
  );
}
