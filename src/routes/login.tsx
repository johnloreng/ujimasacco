import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Ujima SACCO Loan" },
      { name: "description", content: "Sign in to your Ujima SACCO Loan account to apply for and manage loans." },
      { property: "og:title", content: "Sign in" },
      { property: "og:description", content: "Access your Ujima account." },
      { property: "og:url", content: "/login" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/login" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  return (
    <PageShell>
      <Section>
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8 shadow-card">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to continue to Ujima.</p>
          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Field label="Email or phone">
              <Input value={id} onChange={(e) => setId(e.target.value)} autoComplete="username" />
            </Field>
            <Field label="Password">
              <Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="current-password" />
            </Field>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <Checkbox /> Remember me
              </label>
              <Link to="/reset-password" className="text-brand hover:underline">Forgot password?</Link>
            </div>
            <Button className="w-full rounded-full gradient-brand text-brand-foreground">Sign in</Button>
          </form>
          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> OR <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="rounded-full">Google</Button>
            <Button variant="outline" className="rounded-full">Apple</Button>
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to Ujima? <Link to="/register" className="font-medium text-brand hover:underline">Create account</Link>
          </p>
        </div>
      </Section>
    </PageShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}