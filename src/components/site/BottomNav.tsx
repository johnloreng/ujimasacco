import { Link } from "@tanstack/react-router";
import { Home, Info, BookOpen, Settings } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function BottomNav() {
  const { t } = useI18n();
  const items = [
    { to: "/", icon: Home, label: t("nav.home"), exact: true },
    { to: "/about", icon: Info, label: t("nav.about") },
    { to: "/stories", icon: BookOpen, label: t("nav.stories") },
    { to: "/settings", icon: Settings, label: t("nav.settings") },
  ];
  return (
    <nav className="fixed bottom-3 left-1/2 z-40 -translate-x-1/2 md:hidden" aria-label="Primary">
      <ul className="flex items-center gap-1 rounded-2xl border border-border/60 bg-background/95 px-2 py-1.5 shadow-soft backdrop-blur">
        {items.map((i) => {
          const Icon = i.icon;
          return (
            <li key={i.to}>
              <Link
                to={i.to}
                activeOptions={{ exact: i.exact }}
                className="flex min-w-16 flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-[11px] text-muted-foreground transition data-[status=active]:bg-accent data-[status=active]:text-brand"
              >
                <Icon className="h-5 w-5" />
                <span>{i.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}