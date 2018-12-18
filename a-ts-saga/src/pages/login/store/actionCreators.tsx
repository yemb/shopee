
import * as constants from './constants';
// import axios from 'axios';
// import fetch from '@/util/util.js'

export const changeLogin = () => ({
    type: constants.LOGIN,
    value: true
})
export const loginError = () => ({
    type: constants.LOGIN_ERROR
})

export const loginAsync = (username: any, password: any) => ({
    type: constants.LOGIN_ASYNC,
    username,
    password
})

export const changeInput = (input:any, value:any) => ({
    type: constants.CHANGE_INPUT,
    input,
    value
})

export const changeLang = () => ({
    type: constants.CHANGE_LANG
})

// export const login = (username: any, password: any) => {
//     return (dispatch: any) => {
//         fetch({
//             url: '/auth/token',
//             method: 'POST',
//             data: {
//                 username,
//                 password
//             }
//         }).then((res) => {
//             const token = res.data.token
//             console.log('login',res)
//             if(window.sessionStorage) {
//                 sessionStorage.setItem("token", token)
//             } 
//             dispatch(changeLogin())
//         }).catch(() => {
//             dispatch(loginError())
//         })
//     }
// }


