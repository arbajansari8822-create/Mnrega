import { useEffect, useState } from 'react';
import { useLang } from '../context/LangContext';

export default function InstallPrompt() {
  const { t } = useLang();
  const [evt, setEvt] = useState(null);

  useEffect(() => {
    const h = (e) => { e.preventDefault(); setEvt(e); };
    window.addEventListener('beforeinstallprompt', h);
    return () => window.removeEventListener('beforeinstallprompt', h);
  }, []);

  if (!evt) return null;
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-brand-600 bg-brand-50 p-3">
      <span className="font-semibold text-brand-800">📲 {t.installTitle}</span>
      <button
        className="btn-primary min-h-[44px]"
        onClick={async () => { evt.prompt(); await evt.userChoice; setEvt(null); }}
      >
        {t.install}
      </button>
    </div>
  );
}
