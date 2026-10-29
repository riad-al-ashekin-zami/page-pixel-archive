import { describe, expect, it } from "vitest";
import { MANAGEMENT_COMPARISON } from "./management-comparison";
describe("preserved management support rules", () => {
  it("keeps dedicated account management exclusive to management", () => {
    expect(MANAGEMENT_COMPARISON[0]).toEqual({ mgmt: true, maint: false, diy: false });
  });
  it("keeps uptime support an add-on for management and included in maintenance", () => {
    expect(MANAGEMENT_COMPARISON[1]).toEqual({ mgmt: "add_on", maint: true, diy: false });
  });
  it("keeps full executive reporting in management and basic reporting in maintenance", () => {
    expect(MANAGEMENT_COMPARISON[5]).toEqual({ mgmt: true, maint: "basic", diy: false });
  });
});
