
import { combineReducers } from 'redux-immutable';
import { reducer as loginReducer } from '@/pages/login/store'
import { reducer as listReducer } from '@/pages/list/store'
import { reducer as detailReducer } from '@/pages/detail/store'
import { reducer as meReducer } from '@/pages/me/store'

// import { fromJS } from 'immutable';
// import * as constants from './constants';

// const defaultState = fromJS({
//     isHome: true
// })

// const commonReducer = (state = defaultState, action: any) => {
//     switch (action.type) {
//         case constants.TOLIST:
//             return state.set('isHome', action.value);
//         case constants.LEAVELIST:
//             return state.set('isHome', action.value);
//     return state
//     }
// }

const reducer = combineReducers({
    login: loginReducer,
    list: listReducer,
    detail: detailReducer,
    me: meReducer
    // common: commonReducer
})

export default reducer
