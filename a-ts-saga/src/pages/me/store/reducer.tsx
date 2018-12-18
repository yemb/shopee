import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    status: 'liked',
    likeList: [],
    goingList: [],
    pastList: [],
    myInfo: null,
    success: false
})
export default (state = defaultState, action: any) => {
    switch (action.type) {
        case constants.TOGGLE_STATUS:
            return state.set('status', action.value)
        case constants.GET_TYPE_LIST:
            return getTypeList(state, action)
        case constants.GET_MY_INFO:
            return state.merge({
                myInfo: fromJS(action.value),
                success: true
            })
    }
    return state
}

const getTypeList = (state: any, action: any) => {
    console.log('getlist in reducer')
    if(action.status === 'liked') {
        return state.merge({
            likeList: fromJS(action.data)
        })
    }
    if(action.status === 'going') {
        return state.merge({
            goingList: fromJS(action.data)
        })
    }
    if(action.status === 'past') {
        return state.merge({
            pastList: fromJS(action.data)
        })
    }
    
}