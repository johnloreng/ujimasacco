import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Eye, Users, Crown, Globe2, Sprout, ShieldCheck, TrendingUp } from "lucide-react";
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
          <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand">About Ujima</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Ethical microfinance, rooted in African soil.
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Ujima SACCO is built on the <strong>ETHOS framework</strong>: Empathy, Transparency, Human Impact,
            Ownership, and Sovereignty. We ensure 100% of your data remains under African governance,
            compliant with the Kenya DPA 2022.
          </p>
        </motion.div>
      </Section>

      <Section className="pt-0">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">The ETHOS framework</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3 lg:grid-cols-5">
          {[
            { icon: Heart, title: "Empathy", desc: "Algorithms that respect seasonal income variance and rural realities." },
            { icon: Eye, title: "Transparency", desc: "Clear terms, no hidden fees, open data practices." },
            { icon: Users, title: "Human Impact", desc: "Loans measured by lives uplifted, not just margins." },
            { icon: Crown, title: "Ownership", desc: "Member-owned, community-governed financial cooperative." },
            { icon: Globe2, title: "Sovereignty", desc: "Your data stays in Africa, under Kenya DPA 2022." },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
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
          <h2 className="text-3xl font-semibold">Our promise to you</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            We do not use urban-centric AI models to judge rural market vendors. Ujima is harvest-aligned,
            community-owned, and African by design.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { icon: Sprout, title: "Harvest-aligned", desc: "Repay when your matooke or maize harvest brings income." },
              { icon: ShieldCheck, title: "African data sovereignty", desc: "All data governed under Kenya DPA 2022." },
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