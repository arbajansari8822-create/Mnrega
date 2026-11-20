/**
 * MOCK API — simulates the data we hope to get from the official MIS reports.
 *
 * Replace the body of fetchJobCardData() with a real call (backend proxy that
 * parses the MIS reports) and keep the same return shape; the UI won't change.
 *
 * Shape:
 * {
 *   jobCardId, holderName,
 *   status: 'busy' | 'free',
 *   workName, musterRollId, workStartDate,          // when busy
 *   demand: { status: 'registered' | 'none', date },
 *   payment: { status: 'credited' | 'fto_generated' | 'pending',
 *              lastPayment, paymentDate, ftoNo },
 *   lastUpdated, isDemo
 * }
 * Dates are DD-MM-YYYY strings.
 */
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const NAMES = [
  ['Ramesh Oraon', 'रमेश उरांव'], ['Sunita Devi', 'सुनीता देवी'],
  ['Birsa Munda', 'बिरसा मुंडा'], ['Kamla Kumari', 'कमला कुमारी'],
  ['Sanjay Mahto', 'संजय महतो'],
];

const WORKS = [
  { en: 'Canal Cleaning', hi: 'नहर सफाई' },
  { en: 'Pond Digging', hi: 'तालाब खुदाई' },
  { en: 'Rural Road Repair', hi: 'ग्रामीण सड़क मरम्मत' },
  { en: 'Tree Plantation', hi: 'वृक्षारोपण' },
];

const SCENARIOS = {
  // keyed by last character of the job card number
  busy: (i) => ({
    status: 'busy', workName: WORKS[i % 4], musterRollId: String(12345 + i),
    workStartDate: '04-11-2025',
    demand: { status: 'registered', date: '01-11-2025' },
    payment: { status: 'credited', lastPayment: 2500, paymentDate: '15-10-2025', ftoNo: null },
  }),
  busyFto: (i) => ({
    status: 'busy', workName: WORKS[i % 4], musterRollId: String(22340 + i),
    workStartDate: '10-11-2025',
    demand: { status: 'registered', date: '08-11-2025' },
    payment: { status: 'fto_generated', lastPayment: 1800, paymentDate: '18-11-2025', ftoNo: 'JH0512' + (3000 + i) },
  }),
  freeDemand: () => ({
    status: 'free', workName: null, musterRollId: null, workStartDate: null,
    demand: { status: 'registered', date: '14-11-2025' },
    payment: { status: 'credited', lastPayment: 3200, paymentDate: '28-10-2025', ftoNo: null },
  }),
  freeNone: () => ({
    status: 'free', workName: null, musterRollId: null, workStartDate: null,
    demand: { status: 'none', date: null },
    payment: { status: 'pending', lastPayment: null, paymentDate: null, ftoNo: null },
  }),
};

function pickScenario(jobCardId) {
  const d = parseInt(jobCardId.slice(-1), 10);
  const i = Number.isNaN(d) ? 0 : d;
  if (i <= 2) return SCENARIOS.busy(i);
  if (i <= 4) return SCENARIOS.busyFto(i);
  if (i <= 6) return SCENARIOS.freeDemand(i);
  return SCENARIOS.freeNone(i);
}

export async function fetchJobCardData(jobCardId, panchayatId) {
  await delay(900 + Math.random() * 500);

  // Demo of an error path: job cards ending in "000" are "not found".
  if (jobCardId.endsWith('000')) {
    const err = new Error('JOB_CARD_NOT_FOUND');
    err.code = 'NOT_FOUND';
    throw err;
  }

  const sum = [...jobCardId].reduce((a, c) => a + c.charCodeAt(0), 0);
  const [en, hi] = NAMES[sum % NAMES.length];

  return {
    jobCardId,
    panchayatId,
    holderName: { en, hi },
    ...pickScenario(jobCardId),
    lastUpdated: new Date().toISOString(),
    isDemo: true,
  };
}
