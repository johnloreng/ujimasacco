import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset password — Ujima SACCO Loan" },
      { name: "description", content: "Reset your Ujima account password securely with OTP verification." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/reset-password" }],
  }),
  component: ResetPage,
});

type Step = 1 | 2 | 3 | 4;

function ResetPage() {
  const [step, setStep] = useState<Step>(1);
  return (
    <PageShell>
      <Section>
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8 shadow-card">
          <Steps step={step} />
          {step === 1 && <RequestOtp onNext={() => setStep(2)} />}
          {step === 2 && <VerifyOtp onNext={() => setStep(3)} />}
          {step === 3 && <NewPassword onNext={() => setStep(4)} />}
          {step === 4 && <Success />}
        </div>
      </Section>
    </PageShell>
  );
}

function Steps({ step }: { step: Step }) {
  return (
    <div className="mb-6 flex items-center gap-2">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className={`h-1.5 flex-1 rounded-full ${n <= step ? "bg-brand" : "bg-border"}`} />
      ))}
    </div>
  );
}

function RequestOtp({ onNext }: { onNext: () => void }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-4">
      <h1 className="text-xl font-semibold">Reset your password</h1>
      <p className="text-sm text-muted-foreground">Enter your registered phone or email — we'll send a one-time code.</p>
      <Input placeholder="Phone or email" />
      <Button className="w-full rounded-full gradient-brand text-brand-foreground">Send code</Button>
    </form>
  );
}

function VerifyOtp({ onNext }: { onNext: () => void }) {
  const [v, setV] = useState(Array(6).fill(""));
  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-4">
      <h1 className="text-xl font-semibold">Enter the code</h1>
      <p className="text-sm text-muted-foreground">We sent a 6-digit code. Enter it below.</p>
      <div className="flex justify-between gap-2">
        {v.map((x, i) => (
          <Input
            key={i}
            value={x}
            inputMode="numeric"
            maxLength={1}
            onChange={(e) => setV((p) => p.map((c, j) => (j === i ? e.target.value.slice(-1) : c)))}
            className="h-12 w-12 rounded-2xl text-center text-lg"
          />
        ))}
      </div>
      <Button className="w-full rounded-full gradient-brand text-brand-foreground">Verify</Button>
    </form>
  );
}

function NewPassword({ onNext }: { onNext: () => void }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-4">
      <h1 className="text-xl font-semibold">Create a new password</h1>
      <Input type="password" placeholder="New password" />
      <Input type="password" placeholder="Confirm password" />
      <Button className="w-full rounded-full gradient-brand text-brand-foreground">Update password</Button>
    </form>
  );
}

function Success() {
  return (
    <div className="text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-brand" />
      <h1 className="mt-3 text-xl font-semibold">Password updated</h1>
      <p className="mt-1 text-sm text-muted-foreground">You can now sign in with your new password.</p>
      <Link to="/login">
        <Button className="mt-5 w-full rounded-full gradient-brand text-brand-foreground">Back to sign in</Button>
      </Link>
    </div>
  );
}