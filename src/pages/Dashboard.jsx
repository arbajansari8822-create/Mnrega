import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import StatusCard from '../components/StatusCard';
import SkeletonCard from '../components/SkeletonCard';
import JobCardInput from '../components/JobCardInput';
import JobCardChips from '../components/JobCardChips';
import QuickActions from '../components/QuickActions';
import GuideModal from '../components/GuideModal';
import InstallPrompt from '../components/InstallPrompt';
import { useLang } from '../context/LangContext';
import { useLocationCtx } from '../context/LocationContext';
import { fetchJobCardData } from '../utils/mockApi';
import { isValidJobCard } from '../utils/config';

const rupee = (n) => '₹' + Number(n).toLocaleString('en-IN');

function useOnline() {
  const [on, setOn] = useState(navigator.onLine);
  useEffect(() => {
    const u = () => setOn(true), d = () => setOn(false);
    window.addEventListener('online', u); window.addEventListener('offline', d);
    return () => { window.removeEventListener('online', u); window.removeEventListener('offline', d); };
  }, []);
  return on;
}

export default function Dashboard() {
  const { t, tx, lang } = useLang();
  const navigate = useNavigate();
  const { location, rememberCard, activeCard } = useLocationCtx();
  const online = useOnline();

  const [input, setInput] = useState(activeCard || '');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [guide, setGuide] = useState(false);
  const reqId = useRef(0); // ignore stale responses

  const load = useCallback(async (id) => {
    if (!isValidJobCard(id)) { setError(t.errLength); return; }
    const mine = ++reqId.current;
    setError(''); setLoading(true); setData(null);
    try {
      const res = await fetchJobCardData(id, location.panchayatId);
      if (mine !== reqId.current) return;
      setData(res);
      rememberCard(id);
    } catch (e) {
      if (mine !== reqId.current) return;
      setError(e.code === 'NOT_FOUND' ? t.errNotFound : t.errNetwork);
    } finally {
      if (mine === reqId.current) setLoading(false);
    }
  }, [location, rememberCard, t]);

  // Auto-load last used card on open.
  useEffect(() => { if (isValidJobCard(activeCard)) load(activeCard); /* eslint-disable-next-line */ }, []);

  const pick = (id) => { setInput(id); load(id); };
  const fmtLocale = lang === 'hi' ? 'hi-IN' : 'en-IN';

  const renderCards = () => {
    const d = data;
    const pay = d.payment;
    return (
      <>
        {d.status === 'busy' ? (
          <StatusCard tone="busy" icon="🟢" title={t.busyTitle} headline={t.busy}
            rows={[
              [t.workName, tx(d.workName)],
              [t.musterRoll, d.musterRollId],
              [t.since, d.workStartDate],
            ]} />
        ) : (
          <StatusCard tone="free" icon="🔵" title={t.busyTitle} headline={t.free} note={t.freeNote} />
        )}

        {d.demand.status === 'registered' ? (
          <StatusCard tone="demand" icon="🟡" title={t.demandTitle} headline={t.demandRegistered}
            rows={[[t.demandOn, d.demand.date]]} />
        ) : (
          <StatusCard tone="free" icon="🟡" title={t.demandTitle} headline={t.demandNone} note={t.demandNoneNote} />
        )}

        {pay.status === 'credited' && (
          <StatusCard tone="busy" icon="💰" title={t.payTitle}
            headline={`${t.payCredited}: ${rupee(pay.lastPayment)}`} rows={[[t.on, pay.paymentDate]]} />
        )}
        {pay.status === 'fto_generated' && (
          <StatusCard tone="demand" icon="💰" title={t.payTitle} headline={t.payFto}
            rows={[['FTO', pay.ftoNo], [t.payCredited, `${rupee(pay.lastPayment)} · ${pay.paymentDate}`]]}
            note={t.payFtoNote} />
        )}
        {pay.status === 'pending' && (
          <StatusCard tone="free" icon="💰" title={t.payTitle} headline={t.payPending} note={t.payPendingNote} />
        )}
        <p className="text-xs text-slate-500">
          {t.cardHolder}: <b>{tx(d.holderName)}</b> · {t.updated}:{' '}
          {new Date(d.lastUpdated).toLocaleString(fmtLocale, { dateStyle: 'medium', timeStyle: 'short' })}
        </p>
      </>
    );
  };

  return (
    <>
      <Header onChange={() => navigate('/setup')} />
      <main className="mx-auto max-w-lg space-y-4 px-4 py-4 pb-10">
        {!online && (
          <p role="status" className="rounded-xl bg-demand-bg p-3 text-sm font-semibold text-demand-text">
            📡 {t.offline}
          </p>
        )}
        <InstallPrompt />
        <JobCardInput value={input} onChange={(v) => { setInput(v); setError(''); }}
          onSubmit={() => load(input)} error={error && !loading ? error : ''} loading={loading} />
        <JobCardChips onPick={pick} />

        <div className="space-y-3" aria-live="polite" aria-busy={loading}>
          {loading && <><SkeletonCard /><SkeletonCard /><SkeletonCard /></>}
          {!loading && error && isValidJobCard(input) && (
            <button className="btn-ghost w-full" onClick={() => load(input)}>↻ {t.retry}</button>
          )}
          {!loading && data && (
            <>
              <p className="rounded-lg bg-slate-200 px-3 py-2 text-xs text-slate-700">ℹ️ {t.demoBanner}</p>
              {renderCards()}
            </>
          )}
        </div>

        <QuickActions onGuide={() => setGuide(true)} />
        <p className="pt-2 text-center text-xs text-slate-500">{t.footer}</p>
      </main>
      {guide && <GuideModal onClose={() => setGuide(false)} />}
    </>
  );
}
