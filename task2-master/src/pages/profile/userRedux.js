import {put, call, fork, takeLatest} from 'redux-saga/effects'

import {getProfileApi, loginApi} from './../../util/api'
import {setValue} from '../../util/storage'

const initState = {
  status: 'PENDING',
  user: {},
  error: undefined
}

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, ...action.res, status: 'SUCCESS'}
    case 'GET_PROFILE_SUCCESS':
      return {
        ...state,
        user: action.profile
      }
    case 'LOGIN_FAIL':
      return {...state, status: 'FAIL', error: action.error}
    default:
      return state
  }
}

function * login (action) {
  try {
    yield put({type: 'LOGIN_START'})
    const res = yield call(loginApi, action.payload)
    if (res.error !== undefined) {
      yield put({type: 'LOGIN_FAIL', error: res.error})
    } else {
      yield fork(setValue, 'user', res)
      yield put({type: 'LOGIN_SUCCESS', res})
    }
  } catch (err) {
    yield put({type: 'LOGIN_FAIL', error: err})
  }
}

function * getProfile () {
  try {
    yield put({type: 'REQUEST_START'})
    const profile = yield call(getProfileApi)
    yield put({type: 'GET_PROFILE_SUCCESS', profile})
  } catch (err) {
    yield put({type: 'REQUEST_FAIL', error: err})
  }
}

export function * userSaga () {
  yield [
    takeLatest('LOGIN', login),
    takeLatest('GET_PROFILE', getProfile)
  ]
}
