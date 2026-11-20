import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../i18n/translations';
import { load, save } from '../utils/storage';

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => load('gs.lang', 'hi'));

  useEffect(() => {
    save('gs.lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      t: translations[lang],
      toggleLang: () => setLang((l) => (l === 'hi' ? 'en' : 'hi')),
      // pick localized text from {en, hi}
      tx: (o) => (o ? o[lang] || o.en : ''),
    }),
    [lang]
  );
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
