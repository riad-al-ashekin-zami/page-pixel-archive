import { describe, expect, it } from "vitest";
import { HOMEPAGE_EXAMPLES } from "./homepage-examples";

describe("honest portfolio inclusion", () => {
  it("keeps LumaFern plus three original concepts, not unverified third-party clients", () => {
    expect(HOMEPAGE_EXAMPLES.map(({ name, kind }) => ({ name, kind }))).toEqual([
      { name: "LumaFern Skin Studio", kind: "concept" },
      { name: "Velunara Skin Clinic", kind: "concept" },
      { name: "Aevorielle Aesthetic Dermatology", kind: "concept" },
      { name: "Calderwyn Dermatology Group", kind: "concept" },
    ]);
    expect(HOMEPAGE_EXAMPLES.some((item) => /Skin Lab|San Antonio|Skin Cancer Center|Westlake|Orange County|Aventura|Clear Skin/i.test(item.name))).toBe(false);
  });
  it("includes the distinct studio, medical, aesthetic and multi-location concepts", () => {
    expect(HOMEPAGE_EXAMPLES.map(({ descriptionKey }) => descriptionKey)).toEqual(["studio", "medical", "aesthetic", "group"]);
    expect(new Set(HOMEPAGE_EXAMPLES.map(({ image }) => image)).size).toBe(4);
  });
});
