import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "sw";

const dict = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.stories": "Stories",
    "nav.settings": "Settings",
    "nav.contact": "Contact",
    "nav.login": "Sign in",
    "nav.register": "Join Ujima",
    "hero.title": "Empowering Communities Through Accessible Digital Lending",
    "hero.sub": "Apply, track, and manage your SACCO loans anywhere.",
    "hero.apply": "Apply Now",
    "hero.join": "Join Ujima",
    "features.title": "Built for trust, speed, and flexibility",
    "features.fast": "Fast Approval",
    "features.fastDesc": "Decisions in minutes, not weeks.",
    "features.secure": "Secure Lending",
    "features.secureDesc": "Bank-grade encryption and KYC controls.",
    "features.flex": "Flexible Repayment",
    "features.flexDesc": "Choose terms that fit your cash flow.",
    "calc.title": "Loan Calculator",
    "calc.amount": "Amount (KES)",
    "calc.rate": "Interest Rate (%)",
    "calc.months": "Duration (months)",
    "calc.monthly": "Monthly Payment",
    "calc.interest": "Total Interest",
    "calc.total": "Total Repayment",
    "stats.members": "Active Members",
    "stats.approved": "Approved Loans",
    "stats.value": "Loans Disbursed (KES)",
    "stats.success": "Success Rate",
    "stories.title": "Member Stories",
    "footer.rights": "All rights reserved.",
  },
  sw: {
    "nav.home": "Nyumbani",
    "nav.about": "Kuhusu",
    "nav.stories": "Hadithi",
    "nav.settings": "Mipangilio",
    "nav.contact": "Wasiliana",
    "nav.login": "Ingia",
    "nav.register": "Jiunge na Ujima",
    "hero.title": "Tunawezesha Jamii Kupitia Mikopo ya Kidijitali",
    "hero.sub": "Omba, fuatilia na simamia mikopo yako ya SACCO popote ulipo.",
    "hero.apply": "Omba Sasa",
    "hero.join": "Jiunge na Ujima",
    "features.title": "Imejengwa kwa uaminifu, kasi na unyumbufu",
    "features.fast": "Idhini ya Haraka",
    "features.fastDesc": "Majibu kwa dakika, sio wiki.",
    "features.secure": "Mkopo Salama",
    "features.secureDesc": "Usimbaji wa kiwango cha benki na KYC.",
    "features.flex": "Malipo Nyumbufu",
    "features.flexDesc": "Chagua masharti yanayolingana na mtiririko wako.",
    "calc.title": "Kikokotoo cha Mkopo",
    "calc.amount": "Kiasi (KES)",
    "calc.rate": "Riba (%)",
    "calc.months": "Muda (miezi)",
    "calc.monthly": "Malipo ya Mwezi",
    "calc.interest": "Jumla ya Riba",
    "calc.total": "Jumla ya Malipo",
    "stats.members": "Wanachama",
    "stats.approved": "Mikopo Iliyoidhinishwa",
    "stats.value": "Mikopo Iliyotolewa (KES)",
    "stats.success": "Kiwango cha Mafanikio",
    "stories.title": "Hadithi za Wanachama",
    "footer.rights": "Haki zote zimehifadhiwa.",
  },
} as const;

type Key = keyof typeof dict["en"];

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string }>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const s = (typeof window !== "undefined" && (localStorage.getItem("ujima.lang") as Lang)) || "en";
    setLangState(s);
  }, []);
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("ujima.lang", l);
  }, []);
  const t = useCallback((k: Key) => dict[lang][k] ?? k, [lang]);
  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);