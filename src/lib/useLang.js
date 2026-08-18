import { useCallback, useEffect, useState } from 'react';
import { detectLang, translations } from '../i18n';

export function useLang() {
  const [lang, setLangState] = useState(detectLang);
  const t = translations[lang];

  const setLang = useCallback((l) => {
    setLangState(l);
    try { localStorage.setItem('cc_lang', l); } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t.meta.description);
  }, [lang, t]);

  return [lang, setLang, t];
}
