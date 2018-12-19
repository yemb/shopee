import * as constants from './constants'
import { fromJS } from 'immutable';


const defaultState = fromJS({
    success: false,
    status: "details",
    detail: null,
    goingList: [],
    likeList: [],
    oversize1: false,
    oversize2: false,
    viewAll: false,
    commentInput: '',
    commentToast: false,
    commentList: []
})
export default (state = defaultState, action: any) => {
    switch (action.type) {
        // GET
        case constants.GET_DETAIL:
            return state.merge({
                'detail': fromJS(action.value), 
                'success': true ,
                'viewAll': false
            })
        case constants.GET_LIKELIST:
            return state.set('likeList', fromJS(action.value))
        case constants.GET_GOINGLIST:
            return state.set('goingList', fromJS(action.value))
        case constants.GET_COMMENTLIST:
            return state.set('commentList', fromJS(action.value))
        // POST DELETE
        case constants.ADD_GOING:
            return addGoing(state, action)
        case constants.DELETE_GOING:
            return deleteGoing(state, action)
        case constants.ADD_LIKE:
            return addLike(state, action)
        case constants.DELETE_LIKE:
            return deleteLike(state, action)
        case constants.ADD_COMMENT:
            return addComment(state, action)
        // OTHER
        case constants.TOGGLE_STATUS:
            return state.set('status', action.value)
        case constants.TOGGLE_OVERSIZE_1:
            return state.set('oversize1', !state.get('oversize1'))
        case constants.TOGGLE_OVERSIZE_2:
            return state.set('oversize2', !state.get('oversize2'))
        case constants.TOGGLE_VIEWALL:
            return state.set('viewAll', !state.get('viewAll'))
        case constants.CLEAR_COMMENTINPUT:
            return state.set('commentInput', '')
        case constants.CHANGE_COMMENTINPUT:
            return state.set('commentInput', action.value)
        
    }
    return state
}


const deleteGoing= (state:any, action: any) => {
    const newDetail = JSON.parse(JSON.stringify(state.get('detail')))
    newDetail.me_going = false
    newDetail.going_count -= 1
    return state.set('detail', fromJS(newDetail))
}

const addGoing= (state:any, action: any) => {
    const newDetail = JSON.parse(JSON.stringify(state.get('detail')))
    newDetail.me_going = true
    newDetail.going_count += 1
    return state.set('detail', fromJS(newDetail))
}

const deleteLike= (state:any, action: any) => {
    const newDetail = JSON.parse(JSON.stringify(state.get('detail')))
    newDetail.me_likes = false
    newDetail.likes_count -= 1
    return state.set('detail', fromJS(newDetail))
}

const addLike= (state:any, action: any) => {
    const newDetail = JSON.parse(JSON.stringify(state.get('detail')))
    newDetail.me_likes = true
    newDetail.likes_count += 1
    return state.set('detail', fromJS(newDetail))
}

const addComment = (state:any, action: any)=>{
    console.log('send Comment in reducer')
    return state.merge({
        commentToast: true,
        commentInput: ''
    })
}