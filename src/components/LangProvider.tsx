import { useMemo, useState, type ReactNode } from "react";
import { LangContext, translations, type Lang } from "@/lib/i18n";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const value = useMemo(() => ({ lang, t: translations[lang], setLang }), [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
