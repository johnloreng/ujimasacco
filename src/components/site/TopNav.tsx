import { Link } from "@tanstack/react-router";
import { Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useI18n, type Lang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TopNav() {
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useI18n();

  const navItems = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/stories", label: t("nav.stories") },
    { to: "/contact", label: t("nav.contact") },
    { to: "/settings", label: t("nav.settings") },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-2xl gradient-brand text-brand-foreground font-bold">U</span>
          <span className="font-semibold tracking-tight">Ujima SACCO Loan</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground hover:bg-accent data-[status=active]:bg-accent data-[status=active]:text-accent-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Change language" className="rounded-full">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {(["en", "sw"] as Lang[]).map((l) => (
                <DropdownMenuItem key={l} onClick={() => setLang(l)} className={lang === l ? "font-semibold" : ""}>
                  {l === "en" ? "English" : "Kiswahili"}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme" className="rounded-full">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Link to="/login" className="hidden sm:block">
            <Button variant="ghost" className="rounded-full">{t("nav.login")}</Button>
          </Link>
          <Link to="/register" className="hidden sm:block">
            <Button className="rounded-full gradient-brand text-brand-foreground hover:opacity-95">
              {t("nav.register")}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}