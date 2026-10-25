import { createFileRoute } from "@tanstack/react-router";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { CHATBOT_SYSTEM_PROMPT } from "@/lib/chatbot-knowledge";
import {
  ensureContentIndex,
  renderIndexForPrompt,
} from "@/lib/chatbot-content-sync.server";

type ChatRequestBody = { messages?: unknown; language?: unknown };

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  fr: "French (Français)",
  de: "German (Deutsch)",
  it: "Italian (Italiano)",
  sv: "Swedish (Svenska)",
  no: "Norwegian (Norsk)",
  fi: "Finnish (Suomi)",
  ar: "Arabic (العربية)",
  pl: "Polish (Polski)",
  cs: "Czech (Čeština)",
  pt: "Portuguese (Português)",
};

function extractText(m: UIMessage): string {
  return (m.parts ?? [])
    .map((p: any) => (p?.type === "text" ? p.text : ""))
    .join("")
    .trim();
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages, language } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        const origin = new URL(request.url).origin;
        const index = ensureContentIndex(origin);
        const indexPrompt = renderIndexForPrompt(index);

        const gateway = createLovableAiGatewayProvider(key);
        const model = gateway("google/gemini-3-flash-preview");

        const langCode = typeof language === "string" ? language.slice(0, 2).toLowerCase() : "en";
        const langName = LANGUAGE_NAMES[langCode] ?? "English";
        const langDirective =
          langCode === "en"
            ? ""
            : `\n\n## Language\nRespond in **${langName}** (language code: \`${langCode}\`). All prose, headings, bullets, CTAs, and the "Sources:" label must be in ${langName}. Keep URLs, route paths, and brand/product names in their original form (do not translate slugs like \`/dermatology-website-design\`). If the user writes in another language, still reply in ${langName} unless they explicitly ask you to switch.`;

        const system = [CHATBOT_SYSTEM_PROMPT, indexPrompt, langDirective]
          .filter(Boolean)
          .join("\n\n");

        // ---- Chat logging (best-effort, never blocks response) ----
        let visitorId = getCookie("dwd_visitor");
        if (!visitorId) {
          visitorId = crypto.randomUUID();
          setCookie("dwd_visitor", visitorId, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 365,
          });
        }
        const userAgent = request.headers.get("user-agent") ?? null;

        const uiMessages = messages as UIMessage[];
        const lastUser = [...uiMessages].reverse().find((m) => m.role === "user");
        const lastUserText = lastUser ? extractText(lastUser) : "";

        let sessionRowId: string | null = null;
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          // Reuse the most recent session for this visitor within the last 6 hours;
          // otherwise start a new one.
          const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString();
          const { data: existing } = await supabaseAdmin
            .from("chat_sessions")
            .select("id")
            .eq("visitor_id", visitorId)
            .gte("updated_at", sixHoursAgo)
            .order("updated_at", { ascending: false })
            .limit(1)
            .maybeSingle();

          if (existing?.id) {
            sessionRowId = existing.id;
            await supabaseAdmin
              .from("chat_sessions")
              .update({ updated_at: new Date().toISOString(), language: langCode })
              .eq("id", existing.id);
          } else {
            const { data: created } = await supabaseAdmin
              .from("chat_sessions")
              .insert({
                visitor_id: visitorId,
                language: langCode,
                user_agent: userAgent,
              })
              .select("id")
              .single();
            sessionRowId = created?.id ?? null;
          }

          if (sessionRowId && lastUserText) {
            await supabaseAdmin.from("chat_messages").insert({
              session_id: sessionRowId,
              role: "user",
              content: lastUserText,
            });
          }
        } catch (err) {
          console.error("[chat-log] failed to log user message", err);
        }

        const result = streamText({
          model,
          system,
          messages: await convertToModelMessages(uiMessages),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: uiMessages,
          onFinish: async ({ responseMessage }) => {
            if (!sessionRowId) return;
            const text = extractText(responseMessage as UIMessage);
            if (!text) return;
            try {
              const { supabaseAdmin } = await import(
                "@/integrations/supabase/client.server"
              );
              await supabaseAdmin.from("chat_messages").insert({
                session_id: sessionRowId,
                role: "assistant",
                content: text,
              });
              await supabaseAdmin
                .from("chat_sessions")
                .update({ updated_at: new Date().toISOString() })
                .eq("id", sessionRowId);
            } catch (err) {
              console.error("[chat-log] failed to log assistant message", err);
            }
          },
        });
      },
    },
  },
});
