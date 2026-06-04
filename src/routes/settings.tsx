import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Section } from "@/components/site/Section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/lib/theme";
import { useI18n, type Lang } from "@/lib/i18n";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Ujima SACCO Loan" },
      { name: "description", content: "Manage your profile, security, and preferences." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/settings" }],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <PageShell>
      <Section>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Settings</h1>
        <p className="mt-2 text-sm text-muted-foreground">Manage your account and preferences.</p>

        <Tabs defaultValue="profile" className="mt-8">
          <TabsList className="rounded-full bg-surface p-1">
            <TabsTrigger value="profile" className="rounded-full">Profile</TabsTrigger>
            <TabsTrigger value="security" className="rounded-full">Security</TabsTrigger>
            <TabsTrigger value="prefs" className="rounded-full">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <ProfilePanel />
          </TabsContent>
          <TabsContent value="security" className="mt-6">
            <SecurityPanel />
          </TabsContent>
          <TabsContent value="prefs" className="mt-6">
            <PrefsPanel />
          </TabsContent>
        </Tabs>
      </Section>
    </PageShell>
  );
}

function Card({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
      <h2 className="text-lg font-semibold">{title}</h2>
      {desc && <p className="mt-1 text-sm text-muted-foreground">{desc}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );
}

function ProfilePanel() {
  return (
    <div className="space-y-5">
      <Card title="Profile">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Full name"><Input defaultValue="Amina Hassan" /></Field>
          <Field label="Email"><Input type="email" defaultValue="amina@example.com" /></Field>
          <Field label="Phone"><Input defaultValue="+254 700 123 456" /></Field>
          <Field label="Profile photo">
            <Input type="file" accept="image/*" />
          </Field>
        </div>
        <Button onClick={() => toast.success("Profile updated")} className="mt-5 rounded-full gradient-brand text-brand-foreground">
          Save changes
        </Button>
      </Card>
    </div>
  );
}

function SecurityPanel() {
  const [twoFa, setTwoFa] = useState(false);
  return (
    <div className="space-y-5">
      <Card title="Change password">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Current password"><Input type="password" /></Field>
          <Field label="New password"><Input type="password" /></Field>
        </div>
        <Button onClick={() => toast.success("Password updated")} className="mt-5 rounded-full gradient-brand text-brand-foreground">
          Update password
        </Button>
      </Card>
      <Card title="Two-factor authentication" desc="Add an extra layer of security to your account.">
        <div className="flex items-center justify-between rounded-2xl border border-border bg-surface p-4">
          <div className="text-sm">SMS one-time code</div>
          <Switch checked={twoFa} onCheckedChange={setTwoFa} />
        </div>
      </Card>
      <Card title="Active sessions">
        <div className="space-y-3">
          {[
            { device: "iPhone 14", loc: "Nairobi · Now" },
            { device: "Chrome on MacBook", loc: "Nairobi · 2h ago" },
          ].map((s) => (
            <div key={s.device} className="flex items-center justify-between rounded-2xl border border-border bg-surface p-4">
              <div>
                <div className="text-sm font-medium">{s.device}</div>
                <div className="text-xs text-muted-foreground">{s.loc}</div>
              </div>
              <Button variant="outline" size="sm" className="rounded-full">Sign out</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function PrefsPanel() {
  const { theme, toggle } = useTheme();
  const { lang, setLang } = useI18n();
  const [notif, setNotif] = useState({ email: true, sms: true, push: false });
  return (
    <div className="space-y-5">
      <Card title="Appearance">
        <div className="flex items-center justify-between rounded-2xl border border-border bg-surface p-4">
          <div>
            <div className="text-sm font-medium">Dark mode</div>
            <div className="text-xs text-muted-foreground">Currently {theme}</div>
          </div>
          <Switch checked={theme === "dark"} onCheckedChange={toggle} />
        </div>
      </Card>
      <Card title="Language">
        <div className="flex gap-2">
          {(["en", "sw"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                lang === l ? "border-brand bg-brand text-brand-foreground" : "border-border bg-card"
              }`}
            >
              {l === "en" ? "English" : "Kiswahili"}
            </button>
          ))}
        </div>
      </Card>
      <Card title="Notifications">
        {(["email", "sms", "push"] as const).map((k) => (
          <div key={k} className="mb-2 flex items-center justify-between rounded-2xl border border-border bg-surface p-4 last:mb-0">
            <div className="text-sm capitalize">{k} notifications</div>
            <Switch
              checked={notif[k]}
              onCheckedChange={(v) => setNotif((p) => ({ ...p, [k]: v }))}
            />
          </div>
        ))}
      </Card>
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