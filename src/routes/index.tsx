import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Sliders, ArrowRight, Quote } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ujima SACCO Loan | Secure Digital Lending Platform" },
      { name: "description", content: "Apply, track, and manage SACCO loans on any device with bank-grade security and flexible repayment." },
      { property: "og:title", content: "Ujima SACCO Loan" },
      { property: "og:description", content: "Secure, affordable digital lending for SACCO members." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <span>{n.toLocaleString()}{suffix}</span>;
}

function LoanCalculator() {
  const { t } = useI18n();
  const [amount, setAmount] = useState(50000);
  const [rate, setRate] = useState(12);
  const [months, setMonths] = useState(12);
  const { monthly, interest, total } = useMemo(() => {
    const r = rate / 100 / 12;
    const m = r === 0 ? amount / months : (amount * r) / (1 - Math.pow(1 + r, -months));
    const total = m * months;
    return { monthly: m, interest: total - amount, total };
  }, [amount, rate, months]);
  const fmt = (n: number) => `KES ${Math.round(n).toLocaleString()}`;
  return (
    <div className="grid gap-6 rounded-3xl border border-border bg-card p-6 shadow-card md:grid-cols-2 md:p-8">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{t("calc.title")}</h3>
        <Field label={t("calc.amount")}>
          <Input type="number" value={amount} onChange={(e) => setAmount(+e.target.value || 0)} />
        </Field>
        <Field label={t("calc.rate")}>
          <Input type="number" value={rate} step="0.1" onChange={(e) => setRate(+e.target.value || 0)} />
        </Field>
        <Field label={t("calc.months")}>
          <Input type="number" value={months} onChange={(e) => setMonths(+e.target.value || 1)} />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <Stat label={t("calc.monthly")} value={fmt(monthly)} highlight />
        <Stat label={t("calc.interest")} value={fmt(interest)} />
        <Stat label={t("calc.total")} value={fmt(total)} />
        <Link to="/register">
          <Button className="mt-2 w-full rounded-full gradient-brand text-brand-foreground">
            Apply for this loan <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
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

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 ${highlight ? "border-brand/30 bg-brand-soft/50" : "border-border bg-surface"}`}>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`mt-1 text-2xl font-semibold ${highlight ? "text-brand" : ""}`}>{value}</div>
    </div>
  );
}

const STORIES = [
  { name: "Amina Hassan", role: "Tailor, Nairobi", text: "Ujima helped me buy a second sewing machine. My income doubled in 6 months." },
  { name: "Peter Otieno", role: "Farmer, Kisumu", text: "Got a tractor loan approved in two days. The process felt effortless." },
  { name: "Grace Wanjiku", role: "Shop Owner, Nakuru", text: "Flexible repayment matched my seasonal cash flow. Truly built for us." },
];

function Index() {
  const { t } = useI18n();
  return (
    <PageShell>
      {/* HERO */}
      <section className="gradient-hero">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-medium text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                Trusted by 12,000+ members
              </span>
              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                {t("hero.title")}
              </h1>
              <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">{t("hero.sub")}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/register">
                  <Button size="lg" className="rounded-full gradient-brand text-brand-foreground shadow-soft">
                    {t("hero.apply")} <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="rounded-full">
                    {t("hero.join")}
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl border border-border bg-card p-2 shadow-soft"
            >
              <div className="rounded-2xl bg-surface p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Loan balance</div>
                  <span className="rounded-full bg-accent-gold/15 px-2 py-0.5 text-xs font-medium text-[color:var(--accent-gold)]">Active</span>
                </div>
                <div className="mt-2 text-3xl font-semibold">KES 84,500</div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  {["Mar", "Apr", "May"].map((m, i) => (
                    <div key={m} className="rounded-xl bg-background p-3">
                      <div className="text-[10px] text-muted-foreground">{m}</div>
                      <div className="text-sm font-semibold">KES {(7500 + i * 200).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-background">
                  <div className="h-full w-2/3 gradient-brand" />
                </div>
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>67% repaid</span><span>4 months left</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <Section>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{t("features.title")}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { icon: Zap, title: t("features.fast"), desc: t("features.fastDesc") },
            { icon: ShieldCheck, title: t("features.secure"), desc: t("features.secureDesc") },
            { icon: Sliders, title: t("features.flex"), desc: t("features.flexDesc") },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl border border-border bg-card p-6 shadow-card"
              >
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* CALCULATOR */}
      <Section className="pt-0">
        <LoanCalculator />
      </Section>

      {/* STATS */}
      <Section className="pt-0">
        <div className="rounded-3xl border border-border gradient-brand p-8 text-brand-foreground md:p-12">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {[
              { label: t("stats.members"), value: 12450 },
              { label: t("stats.approved"), value: 38200 },
              { label: t("stats.value"), value: 1240000000 },
              { label: t("stats.success"), value: 98, suffix: "%" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-semibold md:text-4xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-sm opacity-90">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* STORIES PREVIEW */}
      <Section className="pt-0">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{t("stories.title")}</h2>
          <Link to="/stories" className="text-sm text-brand hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {STORIES.map((s) => (
            <div key={s.name} className="hover-lift rounded-3xl border border-border bg-card p-6 shadow-card">
              <Quote className="h-6 w-6 text-brand" />
              <p className="mt-3 text-sm leading-relaxed">{s.text}</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-soft text-brand font-semibold">
                  {s.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
