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
    "hero.title": "Harvest-Aligned Loans for African Communities",
    "hero.sub": "Ethical microfinance for market vendors, farmers, and informal traders. Repay when your harvest brings income — no rigid monthly traps.",
    "hero.apply": "Apply Now",
    "hero.join": "Join Ujima",
    "features.title": "Built on the ETHOS framework",
    "features.fast": "Harvest-Aligned",
    "features.fastDesc": "Repayment schedules that follow your matooke, maize, or coffee harvest — not a rigid calendar.",
    "features.secure": "African Data Sovereignty",
    "features.secureDesc": "100% of your data stays under African governance, compliant with the Kenya DPA 2022.",
    "features.flex": "Ethical AI",
    "features.flexDesc": "We don't use urban-centric models to judge rural vendors. Our algorithms respect seasonal income.",
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
    "hero.title": "Mikopo Inayolingana na Mavuno kwa Jamii za Kiafrika",
    "hero.sub": "Mikopo ya kimaadili kwa wachuuzi, wakulima na wafanyabiashara wadogo. Lipa wakati mavuno yako yanapokuletea kipato.",
    "hero.apply": "Omba Sasa",
    "hero.join": "Jiunge na Ujima",
    "features.title": "Imejengwa kwa msingi wa ETHOS",
    "features.fast": "Inayolingana na Mavuno",
    "features.fastDesc": "Ratiba za malipo zinazofuata mavuno yako ya matooke, mahindi au kahawa.",
    "features.secure": "Uhuru wa Data Afrika",
    "features.secureDesc": "100% ya data yako inabaki chini ya utawala wa Kiafrika (Kenya DPA 2022).",
    "features.flex": "AI ya Kimaadili",
    "features.flexDesc": "Hatutumii mifumo ya mijini kuhukumu wachuuzi wa vijijini. Algorithms zetu zinaheshimu kipato cha msimu.",
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