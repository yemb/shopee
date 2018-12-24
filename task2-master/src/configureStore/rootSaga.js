import {fork} from 'redux-saga/effects'

import {userSaga} from '../pages/profile/userRedux'
import {listSaga} from './../pages/list/listRedux'

export default function * rootSaga () {
  yield fork(userSaga)
  yield fork(listSaga)
}
