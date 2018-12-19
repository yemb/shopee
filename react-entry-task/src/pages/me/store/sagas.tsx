import { takeEvery,put } from 'redux-saga/effects'

import * as actionCreators from './actionCreators'
import * as constants from './constants'
import fetch from '@/util/util'


function* getMyInfo(){
    try {
        const res = yield fetch({
            url: '/user',
            method: 'get'
        }).catch(()=>{
            alert('请先登录!')
            window.open('/login','_top')
        })
        const data = res.data
        yield put(actionCreators.getmyinfo(data))
    } catch (error) {
        console.log(error)
    }    
}

function* getTypeList(action: any){
    console.log('getlist in action')
    try {
        const res = yield fetch({
            url: '/user/events?type='+action.statu,
            method: 'get'
        }).catch(()=>{
            alert('请先登录!')
            window.open('/login','_top')
        })
        const data = res.data.events
        yield put(actionCreators.gettypelist(action.statu, data))
    } catch (error) {
        console.log(error)        
    }
}

function* mySaga() {
    yield takeEvery(constants.GET_MY_INFO_ASYNC, getMyInfo)
    yield takeEvery(constants.GET_TYPE_LIST_ASYNC, getTypeList)
}

export default mySaga;