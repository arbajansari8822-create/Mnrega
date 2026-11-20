import { useLang } from '../context/LangContext';
import { useLocationCtx } from '../context/LocationContext';

export default function Header({ showLocation = true, onChange }) {
  const { t, tx, toggleLang } = useLang();
  const { location } = useLocationCtx();

  return (
    <header className="sticky top-0 z-30 bg-brand-700 text-white shadow-md">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-2 px-4 py-3">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-extrabold leading-tight">{t.appName}</h1>
          {showLocation && location && (
            <p className="truncate text-sm text-brand-100">
              📍 {tx(location.panchayat.name)}, {tx(location.block.name)}
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {showLocation && location && (
            <button
              onClick={onChange}
              className="min-h-[44px] rounded-lg border border-white/50 px-3 text-sm font-semibold active:bg-white/20"
            >
              {t.changeLocation}
            </button>
          )}
          <button
            onClick={toggleLang}
            aria-label="Language"
            className="min-h-[44px] rounded-lg bg-white px-3 text-sm font-bold text-brand-800 active:bg-brand-100"
          >
            {t.langToggle}
          </button>
        </div>
      </div>
    </header>
  );
}
