import { useLang } from '../context/LangContext';
import { formatJobCard, normalizeJobCard } from '../utils/config';

export default function JobCardInput({ value, onChange, onSubmit, error, loading }) {
  const { t } = useLang();

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
      className="rounded-2xl bg-white p-4 shadow-sm"
    >
      <label htmlFor="jobcard" className="mb-2 block font-semibold">{t.jobCardLabel}</label>
      <div className="relative">
        <input
          id="jobcard"
          value={formatJobCard(value)}
          onChange={(e) => onChange(normalizeJobCard(e.target.value))}
          inputMode="text"
          autoCapitalize="characters"
          autoComplete="off"
          spellCheck={false}
          placeholder={t.jobCardHint}
          aria-invalid={!!error}
          aria-describedby={error ? 'jc-err' : undefined}
          className="field pr-16 text-xl font-bold tracking-wider"
        />
        {value && (
          <button
            type="button" onClick={() => onChange('')}
            className="absolute right-1 top-1 min-h-[44px] rounded-lg px-3 text-sm font-semibold text-slate-500"
          >
            {t.clear}
          </button>
        )}
      </div>
      <p className="mt-1 text-right text-sm text-slate-500">{value.length}/18</p>
      {error && <p id="jc-err" role="alert" className="mt-1 font-semibold text-red-700">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary mt-3 w-full disabled:opacity-60">
        🔍 {t.check}
      </button>
    </form>
  );
}
