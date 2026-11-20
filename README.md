# VB-G RAM G Sathi (Gramin Sathi)

Simple, mobile-first PWA for rural users to see Job Card work / demand / payment status.
React (Vite) + Tailwind CSS + `vite-plugin-pwa`. Hindi + English. **Helper app, not an official government app.**

## Run
```bash
npm install
npm run dev        # http://localhost:5173
npm run build && npm run preview
```

## Structure
```
src/
  App.jsx                    routes (/setup, /) + guard
  context/LocationContext    saved location + job-card chips (localStorage)
  context/LangContext        hi/en toggle
  pages/Setup.jsx            State > District > Block > Panchayat
  pages/Dashboard.jsx        job card input, 3 status cards, quick actions
  components/                Header, StatusCard, SkeletonCard, JobCardInput,
                             JobCardChips, QuickActions, GuideModal, InstallPrompt
  data/locations.js          SAMPLE location data (replace with LGD)
  i18n/translations.js       all UI text (hi + en)
  utils/mockApi.js           fetchJobCardData() — MOCK, swap for real backend
  utils/config.js            official links (see below)
```

## Mock data
`fetchJobCardData(jobCardId, panchayatId)` picks a scenario from the **last digit** of the job card:
`0-2` busy + payment credited, `3-4` busy + FTO generated, `5-6` free + demand registered, `7-9` free + nothing pending.
Cards ending `000` return "not found". Every result is flagged `isDemo: true` and the UI shows a demo banner.
Test with e.g. `JH0512003001000011`.

## Needs verification before launch
- `src/utils/config.js`: VB-G RAM G portal home (`vbgramg.dord.gov.in/vbgramg/home.aspx`, listed on the PIB factsheet) is used; the legacy `nrega.nic.in` redirects to `nrega.dord.gov.in`. Job Card / Muster Roll / VB-G RAM G
  portal deep links must be confirmed on the live official site (they could not be verified from the build sandbox).
- `src/data/locations.js` is sample data. Use the official LGD list.
- Job Card format: the app accepts 18 alphanumeric characters (per spec). Check against real cards.
- Demand guide (Form 6, 15 days, 5 km, allowance) is based on MGNREGA rules; confirm what applies under VB-G RAM G.
- Real data needs a backend proxy (browsers cannot call the MIS reports directly because of CORS) and the portal's terms of use must permit it.

## Deploy on Vercel (free)
1. Push this repo to GitHub.
2. vercel.com > Add New > Project > import the repo. Framework: **Vite** (auto), build `npm run build`, output `dist`.
3. Deploy. `vercel.json` already handles SPA routing. HTTPS is automatic, so the PWA is installable.
CLI alternative: `npx vercel --prod`.

## Data options (research notes)
- Citizen reports on the official portal need state/year/district/block/panchayat selection (and captcha on some pages): no public API, and `mnregaweb4.nic.in` returned 403 to cloud IPs, so a serverless scraper may be blocked.
- data.gov.in "District-wise MGNREGA Data at a Glance" exists but its page says no API is available (there is a "Request API" option); it is district-level, not per Job Card.
- Per-Job-Card data therefore needs either an official API from MoRD/NIC or a scraper that the portal terms allow.

## Official report links (research, Nov 2026)
- Report hosts: new VB-G RAM G `vbgramgrep.dord.gov.in/VBGRAMG/`, legacy `mnregaweb2/4.dord.gov.in`.
- `src/data/stateLinks.js`: state-wise Job Card entry links (35 states/UTs, new + legacy portal). Muster roll uses the citizen `mustlogin.aspx` link.
- These links (incl. encrypted `payload`/`Digest` tokens) were copied from panchayatsetu.in, a **private** (non-government) site; the hosts are official `*.dord.gov.in`. They return 401 outside India, so they were **not opened** from the build sandbox. Test from an Indian network and re-check periodically, since the tokens may change.
- MIS report list on the new portal: R1 Beneficiary Detail, R4 Musteroll and Wagelist, R7 Financial, R8 e-FMS, etc.

## Location data status
- Jharkhand: all 24 districts, all 18 Ranchi blocks. Panchayat lists only for Namkum, Kanke, Ormanjhi (sample).
- Other states: a few sample districts only.
- Every level (district/block/panchayat) has a "Not in list — type it" option, so any village can be saved.
- Full data: LGD (lgdirectory.gov.in > Download Directory) has complete state/district/block/GP lists, but the download needs a captcha. Download the CSV manually and import it into `src/data/` (ideally as one lazy-loaded JSON per state).
