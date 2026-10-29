import { describe, expect, it } from "vitest";
import { HOMEPAGE_EXAMPLES } from "./homepage-examples";

describe("honest portfolio inclusion", () => {
  it("keeps only the corrected fictional concept, not unverified third-party clients", () => {
    expect(HOMEPAGE_EXAMPLES.map(({ name, kind }) => ({ name, kind }))).toEqual([
      { name: "LumaFern Skin Studio", kind: "concept" },
    ]);
    expect(HOMEPAGE_EXAMPLES.some((item) => /Skin Lab|San Antonio|Skin Cancer Center|Westlake|Orange County|Aventura|Clear Skin/i.test(item.name))).toBe(false);
  });
});
