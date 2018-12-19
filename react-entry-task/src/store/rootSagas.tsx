import { all, call } from 'redux-saga/effects'

import loginSaga from '@/pages/login/store/sagas'
import meSaga from '@/pages/me/store/sagas'

export default function* rootSaga() {
    yield all([
        // call(loginSagas())
        call(loginSaga),
        call(meSaga)
    ])
  }