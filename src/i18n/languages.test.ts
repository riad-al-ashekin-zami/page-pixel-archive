import { describe, expect, it } from "vitest";
import { DEFAULT_LANGUAGE, resolveRouteLanguage } from "./languages";

describe("site language selection", () => {
  it("defaults to English on unprefixed pages", () => {
    expect(DEFAULT_LANGUAGE).toBe("en");
    expect(resolveRouteLanguage(undefined)).toBe("en");
  });

  it("preserves explicitly requested localized pages", () => {
    expect(resolveRouteLanguage("es")).toBe("es");
    expect(resolveRouteLanguage("ar")).toBe("ar");
  });
});