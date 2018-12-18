import * as constants from './constants'
// import axios from 'axios'
import fetch from '@/util/util'

export const toggleStatus = (value : any) => ({
    type: constants.TOGGLE_STATUS,
    value
})

const getdetail = (value : any) => ({
    type: constants.GET_DETAIL,
    value 
})

export const getDetail = (id: any) => {
    return (dispatch: any) => {
        fetch({
            url: '/events/'+ id,
            method: 'get'
        }).then((res)=>{
            const data = res.data.event
            console.log('detail:', data)
            dispatch(getdetail(data))
        }).catch((res)=>{
            alert('请先登录！！')
            window.open('/login','_top')
        })
    }
}

const getgoinglist = (data: any) => ({
    type: constants.GET_GOINGLIST,
    value: data
})

export const getGoingList = (id: any) => {
    return (dispatch: any) => {
        fetch({
            url: '/events/'+id+'/participants',
            method: 'get'
        }).then((res)=>{
            const data = res.data.users
            dispatch(getgoinglist(data))
        }).catch((res)=>{
            alert('请先登录！！')
            window.open('/login','_top')
        })
    }
}

const getcommentList = (data: any) => ({
    type: constants.GET_COMMENTLIST,
    value: data
})

export const getCommentList = (id: any) => {
    return (dispatch: any) => {
        fetch({
            url: '/events/'+ id + '/comments',
            method: 'get'
        }).then((res)=>{
            const data = res.data.comments
            dispatch(getcommentList(data))
        }).catch((res)=>{
            alert('请先登录！！')
            window.open('/login','_top')
        })
    }
}

const getlikelist = (data: any) => ({
    type: constants.GET_LIKELIST,
    value: data
})

export const getLikeList = (id: any) => {
    return (dispatch: any) => {
        fetch({
            url: '/events/'+ id + '/likes',
            method: 'get'
        }).then((res)=>{
            const data = res.data.users
            dispatch(getlikelist(data))
        }).catch((res)=>{
            alert('请先登录！！')
            window.open('/login','_top')
        })
    }
}

export const buttonClick = (id: any) => {
    console.log('id in action:', id)
    if(id === 1) {
        return {
            type: constants.TOGGLE_OVERSIZE_1,
            id
        }
    } else {
        return {
            type: constants.TOGGLE_OVERSIZE_2,
            id
        }
    }
}


// going like 切换

const deletegoing = (id:any) => ({
    type:constants.DELETE_GOING,
    id
})
export const deleteGoing = (id:any) => {
    return (dispatch:any) => {
        fetch({
            url: '/events/'+id+'/participants',
            method: 'delete'
        }).then((res)=>{
            // getGoingList(id)
            dispatch(deletegoing(id))
        }).catch((res)=>{
            alert('请先登录！！')
            window.open('/login','_top')
        })
    }
}
const addgoing = (id:any) => ({
    type:constants.ADD_GOING,
    id
})

export const addGoing = (id:any) => {
    console.log('toggleGoing in action')
    return (dispatch:any) => {
        fetch({
            url: '/events/'+id+'/participants',
            method: 'post'
        }).then((res)=>{
            dispatch(addgoing(id))
        }).catch((res)=>{
            alert('请先登录！！')
            window.open('/login','_top')
        })
    }
}


const deletelike = (id:any) => ({
    type:constants.DELETE_LIKE,
    id
})
export const deleteLike = (id:any) => {
    return (dispatch: any) => {
        fetch({
            url: '/events/'+id+'/likes',
            method: 'delete'
        }).then((res)=>{
            dispatch(deletelike(id))
        }).catch((res)=>{
            alert('请先登录！！')
            window.open('/login','_top')
        })
    }
}

const addlike = (id:any) => ({
    type:constants.ADD_LIKE,
    id
})
export const addLike = (id:any) => {
    return (dispatch: any) => {
        fetch({
            url: '/events/'+id+'/likes',
            method: 'post'
        }).then((res)=>{
            dispatch(addlike(id))
        }).catch((res)=>{
            alert('请先登录！！')
            window.open('/login','_top')
        })
    }
}

export const toggleViewAll = () => ({
    type: constants.TOGGLE_VIEWALL
})

export const clearCommentInput = () =>({
    type: constants.CLEAR_COMMENTINPUT
})

export const changeCommentInput = (value: any) => ({
    type: constants.CHANGE_COMMENTINPUT,
    value
})

const sendcomment = (id: any) => ({
    type: constants.ADD_COMMENT,
    id
})

export const sendComment = (id: any, commentInput:any) => {
    console.log('send Comment in action')
    return  (dispatch :any) => {
        fetch({
            url: '/events/' + id + '/comments',
            method: 'post',
            data:{
                comment: commentInput
            }
        }).then((res)=> {
            // toast
            dispatch(sendcomment(id))
        }).catch((res)=>{
            alert('请先登录！！')
            window.open('/login','_top')
        })
    }
}