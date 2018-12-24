import {combineReducers } from 'redux'
import {userReducer as user} from '../pages/profile/userRedux'
import {listReducer as list} from './../pages/list/listRedux'
import {commonReducer as common} from './commonRedux'

const reducers = combineReducers({user, list,common})

export default reducers
