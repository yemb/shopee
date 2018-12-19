import * as constants from './constants'


// ******
// *******   异步    ********
// *******
export const gettypelist = (status:any, data: any) => ({
    type: constants.GET_TYPE_LIST,
    status,
    data
})
export const getTypeListAsync = (statu: any) => ({
    type: constants.GET_TYPE_LIST_ASYNC,
    statu
})

export const getMyInfoAsync = () => ({
    type: constants.GET_MY_INFO_ASYNC
})
export const getmyinfo = (value: any) => ({
    type: constants.GET_MY_INFO,
    value
})

// ******
// *******   非非非非    异步    ********
// *******
export const toggleStatus = (value : any) => ({
    type: constants.TOGGLE_STATUS,
    value
})




