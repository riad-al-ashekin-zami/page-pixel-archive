import { describe, expect, it, vi } from "vitest";
import { forwardAuditToFormspree } from "./formspree.server";

const lead = {
  id: "test-submission",
  name: "Integration Test",
  email: "integration-test@example.com",
  website_url: "https://example.com",
  company_name: "Solo practice",
  service_needed: "SEO",
  project_details: "Test audit request",
  language: "es",
  utm_source: "integration-test",
};

describe("Formspree audit forwarding", () => {
  it("sends the audit fields to the owner's exact endpoint", async () => {
    const send = vi.fn<typeof fetch>().mockResolvedValue(new Response("{}", { status: 200 }));
    expect(await forwardAuditToFormspree(lead, send)).toEqual({ accepted: true, error: null });
    const [url, options] = send.mock.calls[0] ?? [];
    expect(url).toBe("https://formspree.io/f/mqpperon");
    expect(options?.method).toBe("POST");
    expect(JSON.parse(String(options?.body))).toMatchObject({
      email: "integration-test@example.com",
      website: "https://example.com",
      practice_type: "Solo practice",
      need: "SEO",
      message: "Test audit request",
      language: "es",
      utm_source: "integration-test",
    });
  });

  it("records a rejection rather than reporting provider acceptance", async () => {
    const send = vi.fn<typeof fetch>().mockResolvedValue(new Response("{}", { status: 422 }));
    expect(await forwardAuditToFormspree(lead, send)).toEqual({
      accepted: false, error: "Formspree rejected submission (422)",
    });
  });

  it("handles an unavailable provider without losing the stored submission flow", async () => {
    const send = vi.fn<typeof fetch>().mockRejectedValue(new Error("network unavailable"));
    expect(await forwardAuditToFormspree(lead, send)).toEqual({
      accepted: false, error: "Formspree unavailable; submission saved in leads",
    });
  });
});