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

export const byId = (list, id) => list.find((x) => x.id === id);

/** Resolve ids -> full location object (names in both languages). */
export function resolveLocation({ stateId, districtId, blockId, panchayatId }) {
  const state = byId(LOCATIONS, stateId);
  const district = state && byId(state.districts, districtId);
  const block = district && byId(district.blocks, blockId);
  const panchayat = block && byId(block.panchayats, panchayatId);
  if (!panchayat) return null;
  return { stateId, districtId, blockId, panchayatId, state, district, block, panchayat };
}
