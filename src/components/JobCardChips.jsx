import { useLang } from '../context/LangContext';
import { useLocationCtx } from '../context/LocationContext';
import { formatJobCard } from '../utils/config';

export default function JobCardChips({ onPick }) {
  const { t } = useLang();
  const { cards, removeCard } = useLocationCtx();
  if (!cards.length) return null;

  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-slate-600">{t.savedCards}</p>
      <ul className="flex flex-wrap gap-2">
        {cards.map((c) => (
          <li key={c} className="flex items-center overflow-hidden rounded-full border border-brand-600 bg-brand-50">
            <button
              onClick={() => onPick(c)}
              className="min-h-[44px] pl-4 pr-2 text-sm font-bold text-brand-800 active:bg-brand-100"
            >
              {formatJobCard(c).slice(0, 4)}…{c.slice(-4)}
            </button>
            <button
              onClick={() => removeCard(c)}
              aria-label={`${t.removeCard} ${c}`}
              className="min-h-[44px] px-3 text-brand-800/70 active:bg-brand-100"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
