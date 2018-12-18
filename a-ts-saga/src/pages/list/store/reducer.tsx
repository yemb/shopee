import { fromJS } from 'immutable';
import * as constants from './constants';


const defaultState = fromJS({
    success: false,
    events: [],
    hasMore: true,
    searchState: false,
    haveSearch: false,

    channels: [{id:100,name:'All'}],
    activeChannel: null,

    dates: ['ANY TIME','TODAY','TOMORROW','THIS WEEK','THIS MOUTH','LATER'],
    activeDate: null

    // activeSearch: false
})

export default (state = defaultState, action: any) => {
    switch (action.type) {
        case constants.GET_EVENTS:
            return state.merge({
                events: action.events,
                hasMore: action.hasMore,
                success: true
            })
        case constants.TOGGLE_SEARCH:
            // return state.set('searchState', action.value);
            return state.merge({
                searchState: action.value,
                haveSearch: true
            })
        case constants.GET_CHANNELS:
            return state.set('channels', fromJS(action.value))
            // return state.set('channels', action.value)
        case constants.TOGGLE_CHANNEL:
            return state.set('activeChannel', action.value);
        case constants.TOGGLE_DATE:
            return state.set('activeDate', action.value)
        case constants.ADD_GOING:
            return addGoing(state, action)
        case constants.DELETE_GOING:
            return deleteGoing(state, action)
        case constants.ADD_LIKE:
            return addLike(state, action)
        case constants.DELETE_LIKE:
            return deleteLike(state, action)

        case constants.CLEAR_SEARCH:
            return state.merge({
                events: action.events,
                hasMore: action.hasMore,
                activeChannel: null,
                activeDate: null,
                haveSearch: false
            })
    }
    return state
}
const deleteGoing= (state:any, action: any) => {
    const newEvents = JSON.parse(JSON.stringify(state.get('events')))
    newEvents.forEach((event: any) => {
        if(event.id === action.id) {
            event.me_going = false
            event.goings_count -=1
        }
    })
    return state.set('events', newEvents)
}

const addGoing= (state:any, action: any) => {
    const newEvents = JSON.parse(JSON.stringify(state.get('events')))
    newEvents.forEach((event: any) => {
        if(event.id === action.id) {
            event.me_going = true
            event.goings_count +=1
        }
    })
    return state.set('events', newEvents)
}

const deleteLike= (state:any, action: any) => {
    const newEvents = JSON.parse(JSON.stringify(state.get('events')))
    newEvents.forEach((event: any) => {
        if(event.id === action.id) {
            event.me_likes = false
            event.likes_count -=1
        }
    })
    return state.set('events', newEvents)
}

const addLike= (state:any, action: any) => {
    const newEvents = JSON.parse(JSON.stringify(state.get('events')))
    newEvents.forEach((event: any) => {
        if(event.id === action.id) {
            event.me_likes = true
            event.likes_count +=1
        }
    })
    return state.set('events', newEvents)
}