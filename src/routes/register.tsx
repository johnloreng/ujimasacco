import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create account — Ujima SACCO Loan" },
      { name: "description", content: "Join Ujima SACCO Loan in minutes and start accessing flexible digital lending." },
      { property: "og:title", content: "Join Ujima SACCO Loan" },
      { property: "og:description", content: "Create your member account." },
      { property: "og:url", content: "/register" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/register" }],
  }),
  component: RegisterPage,
});

const initial = { first: "", last: "", email: "", phone: "", id: "", pw: "", pw2: "" };

function RegisterPage() {
  const [f, setF] = useState(initial);
  const [errs, setErrs] = useState<Record<string, string>>({});
  const u = (k: keyof typeof initial, v: string) => setF((p) => ({ ...p, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const e2: Record<string, string> = {};
    if (f.first.trim().length < 2) e2.first = "Required";
    if (f.last.trim().length < 2) e2.last = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e2.email = "Invalid email";
    if (f.phone.replace(/\D/g, "").length < 9) e2.phone = "Invalid phone";
    if (f.id.trim().length < 5) e2.id = "Enter your National ID";
    if (f.pw.length < 8) e2.pw = "Min 8 characters";
    if (!/[A-Z]/.test(f.pw) || !/[0-9]/.test(f.pw)) e2.pw = "Add uppercase and number";
    if (f.pw !== f.pw2) e2.pw2 = "Passwords don't match";
    setErrs(e2);
    if (Object.keys(e2).length) return;
    toast.success("Account created. Welcome to Ujima!");
    setF(initial);
  };

  return (
    <PageShell>
      <Section>
        <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 shadow-card">
          <h1 className="text-2xl font-semibold tracking-tight">Join Ujima</h1>
          <p className="mt-1 text-sm text-muted-foreground">Become a member in under two minutes.</p>
          <form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-2" noValidate>
            <F label="First name" err={errs.first}><Input value={f.first} onChange={(e) => u("first", e.target.value)} /></F>
            <F label="Last name" err={errs.last}><Input value={f.last} onChange={(e) => u("last", e.target.value)} /></F>
            <F label="Email" err={errs.email}><Input type="email" value={f.email} onChange={(e) => u("email", e.target.value)} /></F>
            <F label="Phone" err={errs.phone}><Input value={f.phone} onChange={(e) => u("phone", e.target.value)} /></F>
            <F label="National ID" err={errs.id} className="md:col-span-2"><Input value={f.id} onChange={(e) => u("id", e.target.value)} /></F>
            <F label="Password" err={errs.pw}><Input type="password" value={f.pw} onChange={(e) => u("pw", e.target.value)} /></F>
            <F label="Confirm password" err={errs.pw2}><Input type="password" value={f.pw2} onChange={(e) => u("pw2", e.target.value)} /></F>
            <Button type="submit" className="rounded-full gradient-brand text-brand-foreground md:col-span-2">Create account</Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already a member? <Link to="/login" className="font-medium text-brand hover:underline">Sign in</Link>
          </p>
        </div>
      </Section>
    </PageShell>
  );
}

function F({ label, err, children, className = "" }: { label: string; err?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
      {err && <span className="mt-1 block text-xs text-destructive">{err}</span>}
    </label>
  );
}