import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import logger from 'redux-logger'

const sagaMiddleware = createSagaMiddleware()
const middlewares = []
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}
middlewares.push(sagaMiddleware)

function configureStore (initialState = {}) {
  const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares))
  sagaMiddleware.run(rootSaga)
  return store
}

export default configureStore()
