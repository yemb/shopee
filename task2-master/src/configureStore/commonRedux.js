
const initState = {
  language: 'en-us',
}

export const commonReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      let tmp = state.language === 'en-us' ? 'zh-cn': 'en-us'
      return { ...state, language: tmp}
    default:
      return state
  }
}
