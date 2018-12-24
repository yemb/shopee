import {put, call, takeLatest, select} from 'redux-saga/effects'

import {getActivitiesApi, getChannelsApi} from './../../util/api'

const initState = {
  status: 'PENDING',
  activities: [],
  channels: [],
  hasMore: true,
  error: undefined,
  currentActivityId: undefined
}
export const listReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ACTIVITIES_SUCCESS':
      return {
        ...state,
        hasMore: action.result.hasMore,
        activities: action.result.newReq ? action.result.events : [...state.activities, ...action.result.events],
        status: 'SUCCESS'
      }
    case 'GET_CHANNEL_SUCCESS':
      return { ...state, ...action.channels, status: 'SUCCESS'}
    case 'LOGIN_FAIL':
      return {...state, status: 'FAIL', error: action.error}
    case 'CLICK_ACTIVITY':
      return {...state, currentActivityId: action.payload}
    case 'MODIFY_ACTIVITY':
      let copy = JSON.parse(JSON.stringify(state.activities))
      let tmp = copy.find(c => c.id === Number.parseInt(action.payload.activityId))
      tmp[action.payload.key] = action.payload.value
      if (action.payload.key === 'me_going') {
        tmp.goings_count += action.payload.value ? 1 : -1
      }
      if (action.payload.key === 'me_likes') {
        tmp.likes_count += action.payload.value ? 1 : -1
      }
      return {...state, activities: copy}
    default:
      return state
  }
}

function * getActivities (action) {
  try {
    const list = yield select(state => state.list)
    //
    const offset = list.activities.length
    // 如果显示指定offeset，只有参数传递的offset，否则默认追加
    const reqOffset = action.payload && action.payload.offset !== undefined ? action.payload.offset : offset
    const reqLimit = action.payload && action.payload.limit !== undefined ? action.payload.limit : 10

    const params = {
      ...action.payload,
      offset: reqOffset,
      limit: reqLimit
    }
    yield put({type: 'REQUEST_START'})
    const result = yield call(getActivitiesApi, params)
    result.newReq = reqOffset === 0
    yield put({type: 'GET_ACTIVITIES_SUCCESS', result})
  } catch (err) {
    yield put({type: 'REQUEST_FAIL', error: err})
  }
}

function * getChannels () {
  try {
    yield put({type: 'REQUEST_START'})
    const channels = yield call(getChannelsApi)
    yield put({type: 'GET_CHANNEL_SUCCESS', channels})
  } catch (err) {
    yield put({type: 'REQUEST_FAIL', error: err})
  }
}

export function * listSaga () {
  yield [
    takeLatest('GET_ACTIVITIES', getActivities),
    takeLatest('GET_CHANNELS', getChannels)
  ]
}
