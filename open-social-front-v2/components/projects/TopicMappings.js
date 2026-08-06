const getUrl = (image_id) => {
  return `https://images.unsplash.com/${image_id}?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&h=420&q=50`
}

const mappings = {
  'biodiversity': `${getUrl('photo-1691183213834-3b182d3f01ff')}`,
  'climate change': `${getUrl('photo-1570095378004-ce65d6c2d5bb')}`,
  'digital inclusion': `${getUrl('photo-1768595701593-c84fd8143aea')}`,
  'digital rights': `${getUrl('photo-1614064548237-096f735f344f')}`,
  'disability rights': `${getUrl('photo-1580576079917-b66047bed513')}`,
  'feminism': `${getUrl('photo-1548383675-379abfac2c41')}`,
  'humanitarian': `${getUrl('photo-1624638742121-32c6214bddd8')}`,
  'lgbtq rights': `${getUrl('photo-1560379790-d7f9dd2b6116')}`,
  'mental health': `${getUrl('photo-1516302752625-fcc3c50ae61f')}`,
  'non-profit': `${getUrl('photo-1643321611132-15f7b8a63347')}`,
  'participatory democracy': `${getUrl('photo-1543087944-222eb2559a1a')}`,
  'poverty': `${getUrl('photo-1622196464576-446a4a65b63c')}`,
  'racial justice': `${getUrl('photo-1603327173356-48344c9bfd8e')}`,
  'refugees': `${getUrl('photo-1721390017771-78b4c67d9334')}`,
  'renewable energy': `${getUrl('photo-1508514177221-188b1cf16e9d')}`,
  'social change': `${getUrl('photo-1591189596811-b417ab50fa1a')}`,
  'social justice': `${getUrl('photo-1591937350525-92bddfc39b75')}`,
}

export const topicColors = {
  'biodiversity': { bg: 'bg-green-100', text: 'text-green-800', darkBg: 'bg-green-900/30', darkText: 'text-green-300' },
  'climate change': { bg: 'bg-emerald-100', text: 'text-emerald-800', darkBg: 'bg-emerald-900/30', darkText: 'text-emerald-300' },
  'digital inclusion': { bg: 'bg-yellow-100', text: 'text-yellow-800', darkBg: 'bg-yellow-900/30', darkText: 'text-yellow-300' },
  'digital rights': { bg: 'bg-cyan-100', text: 'text-cyan-800', darkBg: 'bg-cyan-900/30', darkText: 'text-cyan-300' },
  'disability rights': { bg: 'bg-sky-100', text: 'text-sky-800', darkBg: 'bg-sky-900/30', darkText: 'text-sky-300' },
  'feminism': { bg: 'bg-fuchsia-100', text: 'text-fuchsia-800', darkBg: 'bg-fuchsia-900/30', darkText: 'text-fuchsia-300' },
  'humanitarian': { bg: 'bg-red-100', text: 'text-red-800', darkBg: 'bg-red-900/30', darkText: 'text-red-300' },
  'lgbtq rights': { bg: 'bg-rose-100', text: 'text-rose-800', darkBg: 'bg-rose-900/30', darkText: 'text-rose-300' },
  'mental health': { bg: 'bg-indigo-100', text: 'text-indigo-800', darkBg: 'bg-indigo-900/30', darkText: 'text-indigo-300' },
  'non-profit': { bg: 'bg-blue-100', text: 'text-blue-800', darkBg: 'bg-blue-900/30', darkText: 'text-blue-300' },
  'participatory democracy': { bg: 'bg-violet-100', text: 'text-violet-800', darkBg: 'bg-violet-900/30', darkText: 'text-violet-300' },
  'poverty': { bg: 'bg-amber-100', text: 'text-amber-800', darkBg: 'bg-amber-900/30', darkText: 'text-amber-300' },
  'racial justice': { bg: 'bg-purple-100', text: 'text-purple-800', darkBg: 'bg-purple-900/30', darkText: 'text-purple-300' },
  'refugees': { bg: 'bg-orange-100', text: 'text-orange-800', darkBg: 'bg-orange-900/30', darkText: 'text-orange-300' },
  'renewable energy': { bg: 'bg-lime-100', text: 'text-lime-800', darkBg: 'bg-lime-900/30', darkText: 'text-lime-300' },
  'social change': { bg: 'bg-teal-100', text: 'text-teal-800', darkBg: 'bg-teal-900/30', darkText: 'text-teal-300' },
  'social justice': { bg: 'bg-pink-100', text: 'text-pink-800', darkBg: 'bg-pink-900/30', darkText: 'text-pink-300' },
}

export default mappings
