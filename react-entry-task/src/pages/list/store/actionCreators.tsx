
import * as constants from './constants'
// import axios from 'axios'
import fetch from '@/util/util'
import * as time from '@/util/time'


/*****
channels dates &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
channels dates &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
***/

export const toggleSearch = (value: any) => ({
    type: constants.TOGGLE_SEARCH,
    value
})
const getchannels = (value: any) => ({
    type: constants.GET_CHANNELS,
    value
})
export const getChannels = () => {
    return (dispatch: any) => {
        fetch({
            url: '/channels',
            method: 'get'
        }).then((res)=>{
            const channels = res.data.channels
            channels.unshift({id:100,name:"All"})
            console.log('channels', channels)
            dispatch(getchannels(channels))
        }).catch((res)=>{
            alert('请先登录！！')
            window.open('/login','_top')
        })
    }
}
export const toggleChannel = (value: any) => ({
    type: constants.TOGGLE_CHANNEL,
    value
})
export const toggleDate = (value: any) => ({
    type: constants.TOGGLE_DATE,
    value
})


/*****
Event  searchevent getMoreEvent clear Event &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
Event  searchevent getMoreEvent clear Event &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
***/

const getevents = (events: any, hasMore: any) => ({
    type: constants.GET_EVENTS,
    events,
    hasMore
})

export const getEvents = () => {
    return (dispatch: any) => {
        fetch({
            url: '/events?limit=10',
            method: 'get'
        }).then((res)=>{
            console.log(res)
            const data = res.data
            dispatch(getevents(data.events, data.hasMore))
            console.log('getEvent 11111111111')
        }).catch((res)=>{
            alert('请先登录！！')
            window.open('/login','_top')
        })
    }
}


export const getEventsBySearch = (channelid?: any, date?: string) => {
    return (dispatch: any) => {
        let url = ''
        if(!date) {
            date = 'ANY TIME'
        }
        if(date==='LATER') {
            const after = time.searchTime(date)
            console.log(after)
            url = `/events?limit=10&after=${after}`
        }
        if(date==='ANY TIME') {
            url = `/events?limit=10`
        } else {
            const before = time.searchTime(date)
            console.log(before)
            url = `/events?limit=10&before=${before}`
        }
        if(channelid&&channelid!==100){
            url = `${url}&channels=${channelid}`
        }
        console.log('getEventsBySearch',url)
        fetch({
            url,
            method: 'get'
        }).then((res)=>{
            const data = res.data
            console.log('getevent by search', data)
            dispatch(getevents(data.events,data.hasMore))
        }).catch((res)=>{
            alert('请先登录！！')
            window.open('/login','_top')
        })
    }
}

const addEvents = (events: any, hasMore: any) =>({
    type: constants.ADD_EVENTS,
    events,
    hasMore
})

export const getMoreEvent = (page: any, channelid: any, date: any) => {
    return (dispatch: any) => {
        const offset = page * 10
        let url = ''
        if(!date) {
            date = 'ANY TIME'
        }
        if(date==='LATER') {
            const after = time.searchTime(date)
            console.log('after',after)
            url = `/events?offset=${offset}&limit=10&after=${after}`
        }
        if(date==='ANY TIME') {
            url = `/events?offset=${offset}&limit=10`
        } else {
            const before = time.searchTime(date)
            console.log('before',before)

            url = `/events?offset=${offset}&limit=10&after=${before}`
        }
        if(channelid){
            url = `${url}&channels=${channelid}`
        }
        fetch({
            url,
            method: 'get'
        }).then((res) =>{
            const data = res.data
            dispatch(addEvents(data.events, data.hasMore))
        })
    }
}


const clearsearch = (events:any, hasMore:any) => ({
    type:constants.CLEAR_SEARCH,
    events,
    hasMore
})

export const clearSearch = () => {
    return (dispatch: any) => {
        fetch({
            url: '/events?limit=10',
            method: 'get'
        }).then((res)=>{
            const data = res.data
            dispatch(clearsearch(data.events, data.hasMore))
        }).catch((res)=>{
            alert('请先登录！！')
            window.open('/login','_top')
        })
    }
}



/*****
going&& like 状态切换&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
going&& like 状态切换&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
***/

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
