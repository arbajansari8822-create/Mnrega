// All outbound links live here so they are easy to correct.
//
// VERIFIED (seen in search results): the legacy NREGA portal home page.
// NOT VERIFIED: deep links for Job Card / Muster Roll / VB-G RAM G portal.
// The official reports need state/district/block/panchayat + financial-year
// parameters that could not be checked from the build sandbox, so these point
// to the portal home. Replace with exact URLs once confirmed on the live site.
export const PORTAL_HOME = 'https://nrega.dord.gov.in/MGNREGA_new/Nrega_home.aspx';

export const LINKS = {
  officialPortal: PORTAL_HOME,
  jobCardPdf: PORTAL_HOME, // TODO: replace with the Job Card / Employment Register report URL
  musterRoll: PORTAL_HOME, // TODO: replace with the Muster Roll report URL
};

export const JOB_CARD_LENGTH = 18;

/** Remove spaces/dashes/slashes and uppercase. Real cards may start with a state code, e.g. JH. */
export const normalizeJobCard = (v) => v.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, JOB_CARD_LENGTH);
export const isValidJobCard = (v) => /^[A-Z0-9]{18}$/.test(v);

/** 1234 5678 ... groups of 4 for readability. */
export const formatJobCard = (v) => v.replace(/(.{4})/g, '$1 ').trim();
