import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Section } from "@/components/site/Section";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Ujima SACCO Loan" },
      { name: "description", content: "Get in touch with the Ujima SACCO Loan team — support, partnerships, and member services." },
      { property: "og:title", content: "Contact Ujima SACCO Loan" },
      { property: "og:description", content: "We're here to help. Reach our support team." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Please enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    if (form.phone.replace(/\D/g, "").length < 7) errs.phone = "Enter a valid phone";
    if (form.subject.trim().length < 3) errs.subject = "Subject is too short";
    if (form.message.trim().length < 10) errs.message = "Message must be at least 10 characters";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent. We'll respond shortly.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 700);
  };

  return (
    <PageShell>
      <Section>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Contact us</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Our member services team typically replies within one business hour.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <form onSubmit={submit} className="lg:col-span-2 space-y-4 rounded-3xl border border-border bg-card p-6 shadow-card md:p-8" noValidate>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full Name" error={errors.name}>
                <Input value={form.name} onChange={(e) => update("name", e.target.value)} />
              </Field>
              <Field label="Email" error={errors.email}>
                <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              </Field>
              <Field label="Subject" error={errors.subject}>
                <Input value={form.subject} onChange={(e) => update("subject", e.target.value)} />
              </Field>
            </div>
            <Field label="Message" error={errors.message}>
              <Textarea rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} />
            </Field>
            <Button type="submit" disabled={sending} className="w-full rounded-full gradient-brand text-brand-foreground md:w-auto">
              {sending ? "Sending…" : "Send message"}
            </Button>
          </form>

          <div className="space-y-4">
            <InfoCard icon={MapPin} title="Head office" lines={["Ujima House, 4th Floor", "Kenyatta Avenue, Nairobi"]} />
            <InfoCard icon={Phone} title="Phone" lines={["+254 700 000 000", "Mon–Sat · 8am–6pm"]} />
            <InfoCard icon={Mail} title="Email" lines={["support@ujimasacco.co.ke"]} />
            <div className="overflow-hidden rounded-3xl border border-border shadow-card">
              <iframe
                title="Office location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=36.81%2C-1.295%2C36.83%2C-1.275&layer=mapnik"
                className="h-56 w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function InfoCard({ icon: Icon, title, lines }: { icon: React.ComponentType<{ className?: string }>; title: string; lines: string[] }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-soft text-brand">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <div className="text-sm font-semibold">{title}</div>
          {lines.map((l) => <div key={l} className="text-xs text-muted-foreground">{l}</div>)}
        </div>
      </div>
    </div>
  );
}