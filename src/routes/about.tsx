import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, HeartHandshake, Users, TrendingUp, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Ujima SACCO Loan" },
      { name: "description", content: "Our mission, vision, values, and impact across the SACCO community." },
      { property: "og:title", content: "About Ujima SACCO Loan" },
      { property: "og:description", content: "Empowering members through accessible digital lending." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <Section>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand">About us</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Building inclusive financial futures, one SACCO at a time.
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Ujima is a digital-first lending platform built for SACCO members. We combine community trust
            with modern technology to make credit faster, fairer, and more transparent.
          </p>
        </motion.div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: Target, title: "Mission", desc: "To unlock economic opportunity for every SACCO member through accessible, fair digital credit." },
            { icon: Eye, title: "Vision", desc: "A continent where every saver can access dignified, flexible financing in minutes." },
            { icon: HeartHandshake, title: "Core Values", desc: "Community, Transparency, Discipline, Innovation, and Member-first service." },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="hover-lift rounded-3xl border border-border bg-card p-6 shadow-card"
              >
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl border border-border bg-surface p-8 md:p-12">
          <h2 className="text-3xl font-semibold">Why choose Ujima</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { icon: Users, title: "Community-owned", desc: "Decisions guided by members, not shareholders." },
              { icon: ShieldCheck, title: "Secure by design", desc: "End-to-end encryption and rigorous KYC." },
              { icon: TrendingUp, title: "Built to grow with you", desc: "From first loan to long-term wealth building." },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="rounded-2xl border border-border bg-card p-5">
                  <Icon className="h-5 w-5 text-brand" />
                  <h3 className="mt-3 text-base font-semibold">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl gradient-brand p-10 text-center text-brand-foreground md:p-14">
          <h2 className="text-3xl font-semibold md:text-4xl">Ready to join the movement?</h2>
          <p className="mt-3 opacity-90">Become a member today and unlock your first loan.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/register"><Button size="lg" variant="secondary" className="rounded-full">Join Ujima</Button></Link>
            <Link to="/contact"><Button size="lg" variant="outline" className="rounded-full border-white/40 bg-transparent text-brand-foreground hover:bg-white/10">Talk to us</Button></Link>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}