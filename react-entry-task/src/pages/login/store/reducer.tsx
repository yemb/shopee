import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    lang: 'ch',
    login: false,
    loginError: false,
    passWord: '',
    userName: '',
})

export default (state = defaultState, action: any) => {
    switch (action.type) {
        case constants.CHANGE_LANG:
            return state.set('lang', state.get('lang')==='ch' ? 'en' : 'ch')
        case constants.LOGIN:
            console.log('login in reducer')
            return state.set('login', action.value);
        case constants.CHANGE_INPUT:
            if(action.input === 'un') {
                return state.set('userName', action.value)
            } else if(action.input === 'pw'){
                return state.set('passWord', action.value)
            } else {
                return state.merge({
                    passWord: '',
                    userName: ''
                })
            }
        case constants.LOGIN_ERROR:
            return state.merge({
                passWord: '',
                loginError: true
            })
        default:
            break;
    }
    return state
}
