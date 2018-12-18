import { takeEvery,put } from 'redux-saga/effects'

// import axios from 'axios'
import * as actionCreators from './actionCreators'
import * as constants from './constants'
import fetch from '@/util/util'

// function* getInitList() {
//   try {
//     const res = yield axios.get('/list')
//     const action = initListAction(res.data)
//     console.log('res',res);
//     yield put(action)
//   } catch (e) {
//     console.log('list request error');
//   }
//   console.log('saga');
// }

// function* changeInput() {
//     try {
//         const action = actionCreators.changeInput()
//     } catch (e) {
//         console.log('changeInput error')
//     }
// }

function* login(action: any) {
    try {
        console.log('login in saga')
        const res = yield fetch({
            url: '/auth/token',
            method: 'POST',
            data: {
                username: action.username,
                password: action.password
            }
        })
        const token = res.data.token
        console.log(token)
        if(window.sessionStorage) {
            sessionStorage.setItem("token",token)
        }
        yield put(actionCreators.changeLogin())
    } catch (e) {
        console.log('login error')
        yield put(actionCreators.loginError())
    }
}



function* mySaga() {
//   yield takeEvery(constants.CHANGE_INPUT, changeInput)
    yield takeEvery(constants.LOGIN_ASYNC, login)
}

export default mySaga;