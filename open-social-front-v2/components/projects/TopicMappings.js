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

export default mappings
