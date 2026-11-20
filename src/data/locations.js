// SAMPLE data for testing. Production: replace with the official LGD
// (Local Government Directory) hierarchy for each state.
const n = (en, hi) => ({ en, hi });

export const LOCATIONS = [
  {
    id: 'JH', name: n('Jharkhand', 'झारखंड'),
    districts: [
      {
        id: 'JH-ranchi', name: n('Ranchi', 'रांची'),
        blocks: [
          { id: 'namkum', name: n('Namkum', 'नामकुम'), panchayats: [
            { id: 'hinoo', name: n('Hinoo', 'हिनू') },
            { id: 'tupudana', name: n('Tupudana', 'टुपुदाना') },
            { id: 'sukurhuttu', name: n('Sukurhuttu', 'सुकुरहुट्टू') },
          ]},
          { id: 'kanke', name: n('Kanke', 'कांके'), panchayats: [
            { id: 'pithoria', name: n('Pithoria', 'पिठोरिया') },
            { id: 'nagri', name: n('Nagri', 'नगड़ी') },
          ]},
          { id: 'ormanjhi', name: n('Ormanjhi', 'ओरमांझी'), panchayats: [
            { id: 'ormanjhi-gp', name: n('Ormanjhi', 'ओरमांझी') },
            { id: 'chakla', name: n('Chakla', 'चकला') },
          ]},
        ],
      },
      {
        id: 'JH-hazaribagh', name: n('Hazaribagh', 'हजारीबाग'),
        blocks: [
          { id: 'barhi', name: n('Barhi', 'बरही'), panchayats: [
            { id: 'barhi-gp', name: n('Barhi', 'बरही') },
            { id: 'karma', name: n('Karma', 'कर्मा') },
          ]},
        ],
      },
    ],
  },
  {
    id: 'BR', name: n('Bihar', 'बिहार'),
    districts: [
      { id: 'BR-gaya', name: n('Gaya', 'गया'), blocks: [
        { id: 'bodhgaya', name: n('Bodh Gaya', 'बोधगया'), panchayats: [
          { id: 'bodhgaya-gp', name: n('Bodh Gaya', 'बोधगया') },
          { id: 'mastipur', name: n('Mastipur', 'मस्तीपुर') },
        ]},
      ]},
      { id: 'BR-patna', name: n('Patna', 'पटना'), blocks: [
        { id: 'danapur', name: n('Danapur', 'दानापुर'), panchayats: [
          { id: 'danapur-gp', name: n('Danapur', 'दानापुर') },
        ]},
      ]},
    ],
  },
  {
    id: 'UP', name: n('Uttar Pradesh', 'उत्तर प्रदेश'),
    districts: [
      { id: 'UP-lucknow', name: n('Lucknow', 'लखनऊ'), blocks: [
        { id: 'bakshi', name: n('Bakshi Ka Talab', 'बख्शी का तालाब'), panchayats: [
          { id: 'bkt-gp', name: n('Bakshi Ka Talab', 'बख्शी का तालाब') },
        ]},
      ]},
    ],
  },
  {
    id: 'MP', name: n('Madhya Pradesh', 'मध्य प्रदेश'),
    districts: [
      { id: 'MP-mandla', name: n('Mandla', 'मंडला'), blocks: [
        { id: 'bichhiya', name: n('Bichhiya', 'बिछिया'), panchayats: [
          { id: 'bichhiya-gp', name: n('Bichhiya', 'बिछिया') },
        ]},
      ]},
    ],
  },
  {
    id: 'RJ', name: n('Rajasthan', 'राजस्थान'),
    districts: [
      { id: 'RJ-udaipur', name: n('Udaipur', 'उदयपुर'), blocks: [
        { id: 'girwa', name: n('Girwa', 'गिर्वा'), panchayats: [
          { id: 'girwa-gp', name: n('Girwa', 'गिर्वा') },
        ]},
      ]},
    ],
  },
];

// --- Jharkhand: all 24 districts (source: Wikipedia, List of districts of Jharkhand) ---
// Blocks / panchayats exist only for a few areas; users can type missing ones (see Setup.jsx).
// Full data should come from LGD (lgdirectory.gov.in Download Directory; needs a captcha).
const JH = LOCATIONS.find((x) => x.id === 'JH').districts;
[
  ['bokaro', 'Bokaro', 'बोकारो'], ['chatra', 'Chatra', 'चतरा'], ['deoghar', 'Deoghar', 'देवघर'],
  ['dhanbad', 'Dhanbad', 'धनबाद'], ['dumka', 'Dumka', 'दुमका'],
  ['east-singhbhum', 'East Singhbhum', 'पूर्वी सिंहभूम'], ['garhwa', 'Garhwa', 'गढ़वा'],
  ['giridih', 'Giridih', 'गिरिडीह'], ['godda', 'Godda', 'गोड्डा'], ['gumla', 'Gumla', 'गुमला'],
  ['jamtara', 'Jamtara', 'जामताड़ा'], ['khunti', 'Khunti', 'खूंटी'], ['koderma', 'Koderma', 'कोडरमा'],
  ['latehar', 'Latehar', 'लातेहार'], ['lohardaga', 'Lohardaga', 'लोहरदगा'], ['pakur', 'Pakur', 'पाकुड़'],
  ['palamu', 'Palamu', 'पलामू'], ['ramgarh', 'Ramgarh', 'रामगढ़'], ['sahebganj', 'Sahebganj', 'साहेबगंज'],
  ['seraikela-kharsawan', 'Seraikela-Kharsawan', 'सरायकेला-खरसावाँ'], ['simdega', 'Simdega', 'सिमडेगा'],
  ['west-singhbhum', 'West Singhbhum', 'पश्चिमी सिंहभूम'],
].forEach(([k, en, hi]) => JH.push({ id: `JH-${k}`, name: n(en, hi), blocks: [] }));

// Ranchi district blocks (block names only; panchayats listed for Namkum, Kanke, Ormanjhi above).
const ranchiBlocks = JH.find((d) => d.id === 'JH-ranchi').blocks;
[
  ['angara', 'Angara', 'अनगड़ा'], ['bero', 'Bero', 'बेड़ो'], ['bundu', 'Bundu', 'बुंडू'],
  ['burmu', 'Burmu', 'बुरमू'], ['chanho', 'Chanho', 'चान्हो'], ['itki', 'Itki', 'इटकी'],
  ['khelari', 'Khelari', 'खलारी'], ['lapung', 'Lapung', 'लापुंग'], ['mandar', 'Mandar', 'मांडर'], ['nagri-block', 'Nagri', 'नगड़ी'],
  ['rahe', 'Rahe', 'राहे'], ['ratu', 'Ratu', 'रातू'], ['silli', 'Silli', 'सिल्ली'],
  ['sonahatu', 'Sonahatu', 'सोनाहातू'], ['tamar', 'Tamar', 'तमाड़'],
].forEach(([k, en, hi]) => ranchiBlocks.push({ id: k, name: n(en, hi), panchayats: [] }));

const byName = (a, b) => a.name.en.localeCompare(b.name.en);
JH.sort(byName);
ranchiBlocks.sort(byName);

export const OTHER = '__other__';

export const byId = (list, id) => list.find((x) => x.id === id);

/** Resolve ids -> full location object (names in both languages). Typed names are used for OTHER. */
export function resolveLocation({ stateId, districtId, blockId, panchayatId, districtName, blockName, panchayatName }) {
  const custom = (name) => (name ? { id: OTHER, name: { en: name, hi: name } } : null);
  const state = byId(LOCATIONS, stateId);
  if (!state) return null;
  const district = districtId === OTHER ? custom(districtName) : byId(state.districts, districtId);
  const block = blockId === OTHER ? custom(blockName) : district && district.blocks && byId(district.blocks, blockId);
  const panchayat =
    panchayatId === OTHER ? custom(panchayatName) : block && block.panchayats && byId(block.panchayats, panchayatId);
  if (!district || !block || !panchayat) return null;
  return { stateId, districtId, blockId, panchayatId, state, district, block, panchayat };
}
