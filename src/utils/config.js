// All outbound links live here so they are easy to correct.
//
// Sources (research, Nov 2026):
// - VB-G RAM G portal: vbgramg.dord.gov.in is listed on the PIB factsheet for the
//   Ministry of Rural Development; home page path /vbgramg/home.aspx.
// - Legacy portal: nrega.nic.in now redirects to nrega.dord.gov.in (checked directly).
// - Reports (Job Card list, Muster Roll / R2) are reached from the portal's
//   State Report > State > Year > District > Block > Panchayat flow. Those pages need
//   per-panchayat parameters, so we link to the portal home instead of guessing URLs.
// NOT YET VERIFIED by opening the live pages (they were unreachable from the build
// sandbox): exact report URLs. Replace the TODO links below once confirmed.
export const PORTAL_HOME = 'https://vbgramg.dord.gov.in/vbgramg/home.aspx';
export const LEGACY_PORTAL_HOME = 'https://nrega.dord.gov.in/MGNREGA_new/Nrega_home.aspx';

export const LINKS = {
  officialPortal: PORTAL_HOME,
  jobCardPdf: PORTAL_HOME, // TODO: State Report > Job Card list for the saved panchayat
  musterRoll: PORTAL_HOME, // TODO: Panchayat report R2 (Demand, Allocation & Muster Roll)
};

export const JOB_CARD_LENGTH = 18;

/** Remove spaces/dashes/slashes and uppercase. Real cards may start with a state code, e.g. JH. */
export const normalizeJobCard = (v) => v.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, JOB_CARD_LENGTH);
export const isValidJobCard = (v) => /^[A-Z0-9]{18}$/.test(v);

/** 1234 5678 ... groups of 4 for readability. */
export const formatJobCard = (v) => v.replace(/(.{4})/g, '$1 ').trim();
