import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { LOCATIONS, OTHER, byId } from '../data/locations';
import { useLang } from '../context/LangContext';
import { useLocationCtx } from '../context/LocationContext';

/** Dropdown with a trailing "not in list" option that reveals a text box. */
function Select({ id, label, value, onChange, options, disabled, allowOther, typed, onTyped }) {
  const { t, tx } = useLang();
  return (
    <div>
      <label htmlFor={id} className="mb-1 block font-semibold">{label}</label>
      <select id={id} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} className="field">
        <option value="">{t.choose}</option>
        {options.map((o) => <option key={o.id} value={o.id}>{tx(o.name)}</option>)}
        {allowOther && <option value={OTHER}>{t.otherOpt}</option>}
      </select>
      {value === OTHER && (
        <input
          aria-label={`${label}: ${t.typeName}`} value={typed} onChange={(e) => onTyped(e.target.value)}
          placeholder={t.typeName} maxLength={60} autoComplete="off" className="field mt-2"
        />
      )}
    </div>
  );
}

export default function Setup() {
  const { t } = useLang();
  const { location, saveLocation } = useLocationCtx();
  const navigate = useNavigate();

  // Pre-fill with the saved location (when changing) or the test default.
  const init = location || { stateId: 'JH', districtId: 'JH-ranchi', blockId: 'namkum', panchayatId: 'hinoo' };
  const [s, setS] = useState(init.stateId);
  const [d, setD] = useState(init.districtId);
  const [b, setB] = useState(init.blockId);
  const [p, setP] = useState(init.panchayatId);
  const [dn, setDn] = useState(location?.districtId === OTHER ? location.district.name.en : '');
  const [bn, setBn] = useState(location?.blockId === OTHER ? location.block.name.en : '');
  const [pn, setPn] = useState(location?.panchayatId === OTHER ? location.panchayat.name.en : '');

  const state = byId(LOCATIONS, s);
  const district = state && byId(state.districts, d);
  const block = district && byId(district.blocks, b);

  const filled = (v, typed) => v && (v !== OTHER || typed.trim());
  const ready = s && filled(d, dn) && filled(b, bn) && filled(p, pn);

  return (
    <>
      <Header showLocation={false} />
      <main className="mx-auto max-w-lg space-y-4 px-4 py-6">
        <div>
          <h2 className="text-2xl font-extrabold text-brand-800">📍 {t.setupTitle}</h2>
          <p className="mt-1 text-slate-600">{t.setupSub}</p>
        </div>
        <form
          className="space-y-4 rounded-2xl bg-white p-4 shadow-sm"
          onSubmit={(e) => {
            e.preventDefault();
            if (!ready) return;
            saveLocation({
              stateId: s, districtId: d, blockId: b, panchayatId: p,
              ...(d === OTHER && { districtName: dn.trim() }),
              ...(b === OTHER && { blockName: bn.trim() }),
              ...(p === OTHER && { panchayatName: pn.trim() }),
            });
            navigate('/', { replace: true });
          }}
        >
          <Select id="state" label={t.state} value={s} options={LOCATIONS}
            onChange={(v) => { setS(v); setD(''); setB(''); setP(''); }} />
          <Select id="district" label={t.district} value={d} options={state?.districts || []} disabled={!s}
            allowOther typed={dn} onTyped={setDn}
            onChange={(v) => { setD(v); setB(v === OTHER ? OTHER : ''); setP(v === OTHER ? OTHER : ''); }} />
          <Select id="block" label={t.block} value={b} options={district?.blocks || []} disabled={!d}
            allowOther typed={bn} onTyped={setBn}
            onChange={(v) => { setB(v); setP(v === OTHER ? OTHER : ''); }} />
          <Select id="panchayat" label={t.panchayat} value={p} options={block?.panchayats || []} disabled={!b}
            allowOther typed={pn} onTyped={setPn} onChange={setP} />
          <button type="submit" disabled={!ready} className="btn-primary w-full text-lg disabled:opacity-50">
            ✅ {t.saveLocation}
          </button>
        </form>
        <p className="text-center text-sm text-slate-500">{t.footer}</p>
      </main>
    </>
  );
}
