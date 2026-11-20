const TONES = {
  busy: 'bg-busy-bg border-busy-border text-busy-text',
  demand: 'bg-demand-bg border-demand-border text-demand-text',
  free: 'bg-free-bg border-free-border text-free-text',
};

/** Generic status card: icon + small title + BIG status text + detail rows. */
export default function StatusCard({ tone = 'free', icon, title, headline, rows = [], note }) {
  return (
    <section
      className={`animate-pop rounded-2xl border-2 p-4 shadow-sm ${TONES[tone]}`}
      aria-label={title}
    >
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide opacity-80">
        <span className="text-xl" aria-hidden="true">{icon}</span>
        {title}
      </div>
      <p className="mt-2 text-2xl font-extrabold leading-snug">{headline}</p>
      {rows.length > 0 && (
        <dl className="mt-3 space-y-1 text-base">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3">
              <dt className="opacity-75">{k}</dt>
              <dd className="text-right font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
      )}
      {note && <p className="mt-3 text-sm opacity-80">{note}</p>}
    </section>
  );
}
