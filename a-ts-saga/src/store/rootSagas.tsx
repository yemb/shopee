import { all, call } from 'redux-saga/effects'

import mySaga from '@/pages/login/store/sagas'

export default function* rootSaga() {
    yield all([
        // call(loginSagas())
        call(mySaga)
    ])
  }