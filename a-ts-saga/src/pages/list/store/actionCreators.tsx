
import * as constants from './constants'
// import axios from 'axios'
import fetch from '@/util/util'
import * as time from '@/util/time'

const getevents = (events: any, hasMore: any) => ({
    type: constants.GET_EVENTS,
    events,
    hasMore
})

export const getEvents = () => {
    return (dispatch: any) => {
        fetch({
            url: '/events',
            method: 'get'
        }).then((res)=>{
            console.log(res)
            const data = res.data
            dispatch(getevents(data.events, data.hasMore))
        }).catch((res)=>{
            alert('请先登录！！')
            window.open('/login','_top')
        })
    }
}

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


export const getEventsBySearch = (channelid?: any, date?: string) => {
    return (dispatch: any) => {
        // axios.get('/api/events').then((res) => {
        //     const data = res.data
        //     let events = data.events
        //     if(channelid !== 100) {
        //         events = data.events.filter((item: any) => {
        //             return item.channel_id === channelid}
        //         )
        //     }
            
        //     console.log(events)
        //     dispatch(getevents(events, data.hasMore))
        // })
        fetch({
            url: '/events',
            method: 'get'
        }).then((res)=>{
            const data = res.data
            let events = data.events
            if(!channelid) {
                channelid = 100
            }
            if(channelid !== 100) {
                events = data.events.filter((item: any) => {
                    if(!date){
                        date = 'ANY TIME'
                    } 
                    return  item.channel_id === channelid && time.searchTime(date, item.begin_time)
                })
            }
            console.log('search channelid', channelid)
            console.log('search events',events)
            dispatch(getevents(events, data.hasMore))
        }).catch((res)=>{
            alert('请先登录！！')
            window.open('/login','_top')
        })
    }
}

// going 状态切换

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

const clearsearch = (events:any, hasMore:any) => ({
    type:constants.CLEAR_SEARCH,
    events,
    hasMore
})

export const clearSearch = () => {
    return (dispatch: any) => {
        fetch({
            url: '/events',
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