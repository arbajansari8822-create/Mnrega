import { useLang } from '../context/LangContext';
import { LINKS } from '../utils/config';

function Tile({ icon, label, href, onClick }) {
  const cls =
    'flex min-h-[96px] flex-col items-center justify-center gap-1 rounded-2xl border border-slate-200 bg-white p-3 text-center font-semibold shadow-sm active:scale-[.98] active:bg-brand-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/40';
  const inner = (
    <>
      <span className="text-3xl" aria-hidden="true">{icon}</span>
      <span className="text-sm leading-snug">{label}</span>
    </>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
  ) : (
    <button onClick={onClick} className={cls}>{inner}</button>
  );
}

export default function QuickActions({ onGuide }) {
  const { t } = useLang();
  return (
    <section aria-label={t.actions}>
      <h2 className="mb-2 text-lg font-extrabold">{t.actions}</h2>
      <div className="grid grid-cols-2 gap-3">
        <Tile icon="📄" label={t.actJobCard} href={LINKS.jobCardPdf} />
        <Tile icon="📋" label={t.actMuster} href={LINKS.musterRoll} />
        <Tile icon="✍️" label={t.actApply} onClick={onGuide} />
        <Tile icon="🌐" label={t.actPortal} href={LINKS.officialPortal} />
      </div>
      <p className="mt-2 text-xs text-slate-500">🔗 {t.opensNew}</p>
    </section>
  );
}
