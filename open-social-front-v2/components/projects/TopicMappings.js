const getUrl = (image_id) => {
  return `https://images.unsplash.com/${image_id}?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&h=420&q=50`
}

const mappings = {
  'climate change': `${getUrl('photo-1570095378004-ce65d6c2d5bb')}`,
  'humanitarian': `${getUrl('photo-1624638742121-32c6214bddd8')}`,
  'poverty': `${getUrl('photo-1622196464576-446a4a65b63c')}`,
  'non-profit': `${getUrl('photo-1643321611132-15f7b8a63347')}`,
  'participatory democracy': `${getUrl('photo-1543087944-222eb2559a1a')}`,
  'social justice': `${getUrl('photo-1591937350525-92bddfc39b75')}`,
  'social change': `${getUrl('photo-1591189596811-b417ab50fa1a')}`,
  'feminism': `${getUrl('photo-1548383675-379abfac2c41')}`
}

export const topicColors = {
  'climate change': { bg: 'bg-emerald-100', text: 'text-emerald-800', darkBg: 'bg-emerald-900/30', darkText: 'text-emerald-300' },
  'humanitarian': { bg: 'bg-red-100', text: 'text-red-800', darkBg: 'bg-red-900/30', darkText: 'text-red-300' },
  'poverty': { bg: 'bg-amber-100', text: 'text-amber-800', darkBg: 'bg-amber-900/30', darkText: 'text-amber-300' },
  'non-profit': { bg: 'bg-blue-100', text: 'text-blue-800', darkBg: 'bg-blue-900/30', darkText: 'text-blue-300' },
  'participatory democracy': { bg: 'bg-violet-100', text: 'text-violet-800', darkBg: 'bg-violet-900/30', darkText: 'text-violet-300' },
  'social justice': { bg: 'bg-pink-100', text: 'text-pink-800', darkBg: 'bg-pink-900/30', darkText: 'text-pink-300' },
  'social change': { bg: 'bg-teal-100', text: 'text-teal-800', darkBg: 'bg-teal-900/30', darkText: 'text-teal-300' },
  'feminism': { bg: 'bg-fuchsia-100', text: 'text-fuchsia-800', darkBg: 'bg-fuchsia-900/30', darkText: 'text-fuchsia-300' },
}

export default mappings
