// All outbound links live here so they are easy to correct.
//
// Sources: PIB factsheet (portal home), and the report hosts used by the official portals
// (*.dord.gov.in), found via the private site panchayatsetu.in. Job Card links are
// state-wise (see data/stateLinks.js). Official hosts return 401 outside India, so these
// links were not opened from the build sandbox: test them from an Indian network.
export const PORTAL_HOME = 'https://vbgramg.dord.gov.in/vbgramg/home.aspx';
export const LEGACY_PORTAL_HOME = 'https://nrega.dord.gov.in/MGNREGA_new/Nrega_home.aspx';

export const LINKS = {
  officialPortal: PORTAL_HOME,
  jobCardPdf: 'https://vbgramgrep.dord.gov.in/VBGRAMG/MISreport.aspx', // fallback when a state has no direct link
  // Citizen muster roll entry (VB-G RAM G). Same link for all states.
  musterRoll:
    'https://vbgramgrep.dord.gov.in/VBGRAMG/citizen_html/mustlogin.aspx?payload=hbJIUb6UFzsPoTY_xEJTSs47nLzY1IIPhPgSkb3E8V4rV4D9_19DWrDYeokBgpNgG4lb1cyM7wPDkilFDJNbaoOFWfzITn0flcyvd0hH9Vo',
  legacyMis: 'https://mnregaweb4.dord.gov.in/netnregarep/MISreport4.aspx', // old MGNREGA reports (FY 2025-26 and earlier)
};

export const JOB_CARD_LENGTH = 18;

/** Remove spaces/dashes/slashes and uppercase. Real cards may start with a state code, e.g. JH. */
export const normalizeJobCard = (v) => v.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, JOB_CARD_LENGTH);
export const isValidJobCard = (v) => /^[A-Z0-9]{18}$/.test(v);

/** 1234 5678 ... groups of 4 for readability. */
export const formatJobCard = (v) => v.replace(/(.{4})/g, '$1 ').trim();
