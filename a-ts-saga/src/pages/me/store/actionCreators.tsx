import * as constants from './constants'
// import axios from 'axios'
import fetch from '@/util/util'

export const toggleStatus = (value : any) => ({
    type: constants.TOGGLE_STATUS,
    value
})

const gettypelist = (status:any, data: any) => ({
    type: constants.GET_TYPE_LIST,
    status,
    data
})

export const getTypeList = (type: any) => {
    console.log('getlist in action')
    return (dispatch : any) => {
        fetch({
            url: '/user/events?type='+type,
            method: 'get'
        }).then((res) => {
            const data = res.data.events
            dispatch(gettypelist(type, data))
        }).catch(()=>{
            alert('请先登录!')
            window.open('/login','_top')
        })
    }
}

const getmyinfo = (value: any) => ({
    type: constants.GET_MY_INFO,
    value
})

export const getMyInfo = () => {
    return (dispatch: any) => {
        fetch({
            url: '/user',
            method: 'get'
        }).then((res)=>{
            const data = res.data
            console.log('myinfo',data)
            dispatch(getmyinfo(data))
        }).catch(()=>{
            alert('请先登录!')
            window.open('/login','_top')
        })
    }
}