import { useEffect, useRef } from 'react';
import { useLang } from '../context/LangContext';

export default function GuideModal({ onClose }) {
  const { t } = useLang();
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-black/50 sm:items-center"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog" aria-modal="true" aria-labelledby="guide-title"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg animate-pop overflow-y-auto rounded-t-3xl bg-white p-5 sm:rounded-3xl"
      >
        <h2 id="guide-title" className="text-xl font-extrabold text-brand-800">{t.guideTitle}</h2>
        <ol className="mt-4 space-y-3">
          {t.guideSteps.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-700 font-bold text-white">
                {i + 1}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 rounded-lg bg-demand-bg p-3 text-sm text-demand-text">{t.guideNote}</p>
        <button ref={closeRef} onClick={onClose} className="btn-primary mt-4 w-full">
          {t.close}
        </button>
      </div>
    </div>
  );
}
