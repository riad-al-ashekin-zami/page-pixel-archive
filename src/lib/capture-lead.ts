import { submitLead, type SubmitLeadInput } from "./leads.functions";

/**
 * Saves a contact-form submission to the leads database.
 * Never throws — form UX must not break if capture fails.
 */
export async function captureLead(
  input: Omit<SubmitLeadInput, "source_page"> & { source_page?: string },
): Promise<void> {
  try {
    await submitLead({
      data: {
        ...input,
        source_page:
          input.source_page ??
          (typeof window !== "undefined"
            ? window.location.pathname + window.location.search
            : null),
      },
    });
  } catch (err) {
    if (import.meta.env.DEV) console.warn("Lead capture failed", err);
  }
}
