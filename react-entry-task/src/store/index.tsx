import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducer';
import rootSagas from '@/store/rootSagas'
// import mySaga from '@/pages/login/store/sagas'


const composeEnhancers = composeWithDevTools({});
const sagaMiddleware = createSagaMiddleware()

// import {IRootState} from './initState';


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
// const store = Redux.createStore(reducer, composeEnhancers(
// 	Redux.applyMiddleware(thunk)
// ));

const enhancers = composeEnhancers(
    applyMiddleware(sagaMiddleware, thunk)
)

const store = createStore(
            reducer as any,
            enhancers
        ) as any;

sagaMiddleware.run(rootSagas)

export default store

// export function configureStore(): any {   
//     return createStore(
//         reducer as any,
//         enhancers
//     ) as any;
// }


