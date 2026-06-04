import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";

type Msg = { id: string; from: "user" | "bot"; text: string };

const FAQS = [
  "How do I apply for a loan?",
  "What are the interest rates?",
  "How long does approval take?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: "w", from: "bot", text: "Karibu! 👋 I'm Ujima support. How can I help today?" },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const send = (value: string) => {
    const v = value.trim();
    if (!v) return;
    setMsgs((m) => [...m, { id: crypto.randomUUID(), from: "user", text: v }]);
    setText("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          from: "bot",
          text: "Thanks for reaching out. A loan officer will respond shortly.",
        },
      ]);
    }, 900);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open support chat"
        className="fixed bottom-20 right-4 z-50 grid h-14 w-14 place-items-center rounded-full gradient-brand text-brand-foreground shadow-soft transition hover:scale-105 md:bottom-6 md:right-6"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-36 right-4 z-50 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft md:bottom-24 md:right-6"
            role="dialog"
            aria-label="Customer support chat"
          >
            <div className="flex items-center gap-3 border-b border-border/60 bg-surface px-4 py-3">
              <div className="grid h-9 w-9 place-items-center rounded-full gradient-brand text-brand-foreground font-semibold">U</div>
              <div>
                <div className="text-sm font-semibold">Ujima Support</div>
                <div className="text-[11px] text-muted-foreground">Typically replies in minutes</div>
              </div>
            </div>
            <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto px-3 py-3">
              {msgs.map((m) => (
                <div
                  key={m.id}
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    m.from === "user"
                      ? "ml-auto bg-brand text-brand-foreground"
                      : "bg-accent text-accent-foreground"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {typing && (
                <div className="bg-accent text-accent-foreground inline-flex gap-1 rounded-2xl px-3 py-2">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
                </div>
              )}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {FAQS.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground transition hover:bg-accent"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(text);
              }}
              className="flex items-center gap-2 border-t border-border/60 p-2"
            >
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your message…"
                className="rounded-full"
              />
              <Button type="submit" size="icon" className="rounded-full gradient-brand text-brand-foreground" aria-label="Send">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}