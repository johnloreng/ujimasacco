import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Quote } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Section } from "@/components/site/Section";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Member Stories — Ujima SACCO Loan" },
      { name: "description", content: "Real stories from Ujima SACCO members about how digital lending transformed their lives and businesses." },
      { property: "og:title", content: "Member Stories" },
      { property: "og:description", content: "Real impact, told by members." },
      { property: "og:url", content: "/stories" },
    ],
    links: [{ rel: "canonical", href: "/stories" }],
  }),
  component: StoriesPage,
});

const CATEGORIES = ["All", "Business", "Agriculture", "Education", "Family"] as const;
type Cat = (typeof CATEGORIES)[number];

const STORIES = [
  { id: 1, name: "Amina Hassan", role: "Tailor", category: "Business", title: "From one machine to a small workshop", date: "2025-09-14",
    body: "With my first Ujima loan I purchased a second sewing machine and hired an apprentice. Within six months my income had doubled and I now serve three boutiques in the city." },
  { id: 2, name: "Peter Otieno", role: "Farmer", category: "Agriculture", title: "A tractor that changed our harvest", date: "2025-08-30",
    body: "Approval took two days. The tractor cut planting time in half and our yield grew 40% this season." },
  { id: 3, name: "Grace Wanjiku", role: "Shop Owner", category: "Business", title: "Repayment that fits my season", date: "2025-08-12",
    body: "Flexible repayment matched my cash flow during low months. I never felt stretched and grew inventory steadily." },
  { id: 4, name: "Joseph Kimani", role: "Teacher", category: "Education", title: "Funding my Master's degree", date: "2025-07-22",
    body: "Ujima helped me finance tuition without taking a year off. I will graduate next year with a clear plan." },
  { id: 5, name: "Rose Achieng", role: "Mother of three", category: "Family", title: "A home of our own", date: "2025-07-04",
    body: "We used the loan to complete our family home. The process felt human, not transactional." },
  { id: 6, name: "Daniel Mwangi", role: "Mechanic", category: "Business", title: "Tools that paid for themselves", date: "2025-06-18",
    body: "New diagnostic equipment doubled what I could service in a day. The repayment ended ahead of schedule." },
  { id: 7, name: "Mary Njeri", role: "Dairy Farmer", category: "Agriculture", title: "Two more cows, one big lift", date: "2025-06-02",
    body: "Milk sales now cover school fees and savings. I'm planning a cold-storage upgrade next." },
  { id: 8, name: "Samuel Otieno", role: "Student", category: "Education", title: "Books, fees, and a laptop", date: "2025-05-21",
    body: "The student package was straightforward. I focus on studies, not paperwork." },
];

function StoriesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Cat>("All");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = useMemo(() => {
    return STORIES.filter((s) => (cat === "All" || s.category === cat) &&
      (q === "" || (s.name + s.title + s.body).toLowerCase().includes(q.toLowerCase())));
  }, [q, cat]);

  const visible = filtered.slice(0, page * perPage);

  return (
    <PageShell>
      <Section>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Member Stories</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Real members, real outcomes. Search by name or filter by category.
        </p>

        <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              placeholder="Search stories…"
              className="rounded-full pl-9"
              aria-label="Search stories"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => { setCat(c); setPage(1); }}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  cat === c
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 text-center text-muted-foreground">No stories match your search.</div>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((s, i) => (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (i % 6) * 0.05 }}
                className="hover-lift flex flex-col rounded-3xl border border-border bg-card p-6 shadow-card"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-brand-soft text-brand font-semibold">
                    {s.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.role} · {s.category}</div>
                  </div>
                </div>
                <Quote className="mt-4 h-5 w-5 text-brand" />
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 line-clamp-4 text-sm text-muted-foreground">{s.body}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{new Date(s.date).toLocaleDateString()}</span>
                  <a href="#" className="font-medium text-brand hover:underline">Read more</a>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {visible.length < filtered.length && (
          <div className="mt-10 text-center">
            <Button onClick={() => setPage((p) => p + 1)} variant="outline" className="rounded-full">
              Load more stories
            </Button>
          </div>
        )}
      </Section>
    </PageShell>
  );
}