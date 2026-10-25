import { useChat } from "@ai-sdk/react";
import { LocalLink } from "@/components/local-link";
import { DefaultChatTransport, type UIMessage } from "ai";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { MessageCircle, X, Send, ArrowUpRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";


const PRIMARY_ACTIONS: { key: "quote" | "audit" | "pricing" | "contact"; href: string }[] = [
  { key: "quote",   href: "/contact" },
  { key: "audit",   href: "/contact" },
  { key: "pricing", href: "/plan-packages-and-costs" },
  { key: "contact", href: "/contact" },
];

const QUICK_KEYS: ("design" | "management" | "seo" | "portfolio" | "pricing" | "audit" | "quote")[] = [
  "design", "management", "seo", "portfolio", "pricing", "audit", "quote",
];

function messageText(m: UIMessage): string {
  return m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
}

export function ChatWidget() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return <ChatWidgetInner />;
}

function ChatWidgetInner() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");
  const lang = i18n.resolvedLanguage ?? "en";

  const welcome = useMemo<UIMessage>(
    () => ({
      id: `welcome-${lang}`,
      role: "assistant",
      parts: [{ type: "text", text: t("chat.welcome") }],
    }),
    [t, lang],
  );

  const { messages, sendMessage, status, error, setMessages } = useChat({
    id: "dwd-assistant",
    messages: [welcome],
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: () => ({ language: lang }),
    }),
  });

  // Refresh the welcome message when the language changes and no conversation has started.
  useEffect(() => {
    if (messages.length <= 1) setMessages([welcome]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [messages, open, status]);

  const submit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    void sendMessage({ text: trimmed });
    setInput("");
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        aria-label={open ? t("chat.closeLabel") : t("chat.openLabel")}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "group fixed bottom-5 right-5 z-50 grid h-16 w-16 place-items-center rounded-full text-white transition-all duration-500 hover:-translate-y-1 hover:scale-105",
          "shadow-[0_20px_60px_-15px_color-mix(in_oklch,var(--brand-primary),transparent_40%)]",
          open && "scale-90 opacity-0 pointer-events-none",
        )}
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 30%), var(--brand-accent, var(--brand-primary)), var(--brand-primary))",
        }}
      >
        <span
          className="absolute inset-0.5 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 25%))",
          }}
        />
        <MessageCircle className="relative h-6 w-6 drop-shadow-sm" />
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400 ring-2 ring-white" />
        </span>
      </button>

      {/* Panel — gradient border shell */}
      <div
        role="dialog"
        aria-label="Website assistant"
        aria-hidden={!open}
        className={cn(
          "fixed bottom-5 right-5 z-50 rounded-[22px] p-[1px] transition-all duration-300 origin-bottom-right",
          "shadow-[0_30px_80px_-20px_color-mix(in_oklch,var(--brand-primary),transparent_55%)]",
          open ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none",
        )}
        style={{
          background:
            "linear-gradient(155deg, color-mix(in oklch, var(--brand-primary), transparent 55%), color-mix(in oklch, var(--brand-primary), transparent 85%) 40%, color-mix(in oklch, var(--brand-primary), transparent 65%))",
        }}
      >
        <div
          className={cn(
            "flex flex-col overflow-hidden rounded-[21px] bg-card",
            "w-[calc(100vw-2.5rem)] max-w-[420px] h-[min(660px,calc(100vh-2.5rem))]",
          )}
        >
          {/* Header */}
          <div
            className="relative flex items-center justify-between gap-3 px-4 py-3.5 text-white overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 28%))",
            }}
          >
            {/* Decorative glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full opacity-30 blur-2xl"
              style={{ background: "radial-gradient(circle, white, transparent 70%)" }}
            />
            <div className="relative flex items-center gap-2.5 min-w-0">
              {/* Premium concentric monogram avatar */}
              <span
                className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full"
                style={{
                  background:
                    "conic-gradient(from 220deg, #d4af37, #fef3c7 25%, #d4af37 50%, #a1741c 75%, #d4af37)",
                  boxShadow:
                    "0 6px 18px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.15)",
                }}
              >
                <span
                  className="absolute inset-[2px] rounded-full grid place-items-center overflow-hidden"
                  style={{
                    background:
                      "radial-gradient(120% 120% at 30% 20%, color-mix(in oklch, var(--brand-primary), white 18%) 0%, var(--brand-primary) 40%, color-mix(in oklch, var(--brand-primary), black 45%) 100%)",
                    boxShadow:
                      "inset 0 1px 1px rgba(255,255,255,0.35), inset 0 -6px 10px rgba(0,0,0,0.35)",
                  }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-1 top-0.5 h-2 rounded-full opacity-60 blur-[2px]"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)",
                    }}
                  />
                  <span
                    className="relative font-serif font-bold text-[13px] leading-none tracking-[-0.03em]"
                    style={{
                      background:
                        "linear-gradient(180deg, #fef9d7 0%, #d4af37 55%, #a1741c 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textShadow: "0 1px 0 rgba(0,0,0,0.2)",
                      fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    DW
                  </span>
                </span>
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold leading-tight flex items-center gap-1.5">
                  {t("chat.assistantName")}
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ring-1 ring-white/20">
                    <ShieldCheck className="h-2.5 w-2.5" /> {t("chat.verified")}
                  </span>
                </div>
                <div className="text-[11px] leading-tight text-white/85">
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 align-middle shadow-[0_0_8px_theme(colors.emerald.400)]" />
                  {t("chat.online")}
                </div>
              </div>
            </div>
            <button
              aria-label={t("chat.closeLabel")}
              onClick={() => setOpen(false)}
              className="relative grid h-8 w-8 place-items-center rounded-full text-white/80 hover:bg-white/15 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Primary actions */}
          <div className="flex gap-1.5 border-b border-border/60 bg-gradient-to-b from-muted/40 to-muted/10 px-3 py-2 overflow-x-auto">
            {PRIMARY_ACTIONS.map((a) => (
              <LocalLink
                key={a.href}
                to={a.href}
                onClick={() => setOpen(false)}
                className="inline-flex shrink-0 items-center gap-1 rounded-full border border-brand-primary/25 bg-white px-2.5 py-1 text-[11px] font-semibold text-brand-primary shadow-sm hover:shadow-md hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all"
              >
                {t(`chat.primary.${a.key}`)}
                <ArrowUpRight className="h-3 w-3" />
              </LocalLink>
            ))}
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            style={{
              background:
                "linear-gradient(180deg, white, color-mix(in oklch, var(--brand-primary), white 92%))",
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex animate-in fade-in slide-in-from-bottom-1 duration-300",
                  m.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
                    m.role === "user"
                      ? "text-white rounded-br-sm"
                      : "bg-white text-foreground rounded-bl-sm ring-1 ring-border/50",
                  )}
                  style={
                    m.role === "user"
                      ? {
                          background:
                            "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 15%))",
                        }
                      : undefined
                  }
                >
                  {m.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-a:text-brand-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-hr:my-2">
                      <ReactMarkdown
                        components={{
                          a: ({ href, children }) => {
                            const isInternal = href?.startsWith("/");
                            if (isInternal) {
                              // Split path + hash so router navigates and browser scrolls
                              const [path, hash] = href!.split("#");
                              return (
                                <LocalLink
                                  to={path || "/"}
                                  hash={hash}
                                  onClick={() => setOpen(false)}
                                  className="inline-flex items-center gap-0.5 border-b border-brand-primary/40 hover:border-brand-primary"
                                >
                                  {children}
                                  <ArrowUpRight className="h-3 w-3 shrink-0 opacity-70" />
                                </LocalLink>
                              );
                            }
                            return (
                              <a href={href} target="_blank" rel="noreferrer">
                                {children}
                              </a>
                            );
                          },
                          strong: ({ children }) => {
                            const text = String(children);
                            // Give the "Sources:" label a subtle citation badge feel
                            if (text.trim().toLowerCase().startsWith("sources")) {
                              return (
                                <strong className="mt-2 inline-block text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                                  {children}
                                </strong>
                              );
                            }
                            return <strong>{children}</strong>;
                          },
                        }}
                      >
                        {messageText(m)}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <span className="whitespace-pre-wrap">{messageText(m)}</span>
                  )}
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="bg-white ring-1 ring-border/50 rounded-2xl rounded-bl-sm px-3.5 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-primary/60 animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-primary/60 animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-primary/60 animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                {t("chat.errorText")}{" "}
                <LocalLink to="/contact" className="underline font-semibold">
                  {t("chat.contactUs")}
                </LocalLink>
                .
              </div>
            )}

            {messages.length <= 1 && (
              <div className="pt-2">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 px-1">
                  {t("chat.quickQuestions")}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_KEYS.map((k) => {
                    const label = t(`chat.quick.${k}.label`);
                    const prompt = t(`chat.quick.${k}.prompt`);
                    return (
                      <button
                        key={k}
                        onClick={() => submit(prompt)}
                        className="inline-flex items-center rounded-full border border-border bg-white px-2.5 py-1 text-xs text-foreground shadow-sm hover:border-brand-primary hover:text-brand-primary hover:shadow-md transition-all"
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
            className="border-t border-border/60 bg-white p-2.5"
          >
            <div className="flex items-end gap-2 rounded-xl border border-border bg-muted/30 px-3 py-2 transition-all focus-within:border-brand-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-primary/15">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit(input);
                  }
                }}
                placeholder={t("chat.placeholder")}
                rows={1}
                className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground max-h-32 py-1"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label={t("chat.sendLabel")}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand-primary), color-mix(in oklch, var(--brand-primary), black 20%))",
                }}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="text-[10px] text-muted-foreground text-center mt-1.5 flex items-center justify-center gap-1">
              <ShieldCheck className="h-2.5 w-2.5" />
              {t("chat.footerNote")}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
