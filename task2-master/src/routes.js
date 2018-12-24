import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import Login from './pages/login'
import List from './pages/list'
import Detail from './pages/detail'
import Profile from './pages/profile'
import {getValue} from './util/storage'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = getValue('user')
  const auth = user && user.token !== undefined
  return (
    <Route {...rest} render={props => (
      auth ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: {from: props.location}
        }} />
      )
    )} />
  )
}

class Routes extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route path='/login' component={Login} />
          <PrivateRoute path='/list' component={List} />
          <PrivateRoute path='/detail/:id' component={Detail} />
          <PrivateRoute path='/profile' component={Profile} />
          <PrivateRoute exact path='/' component={List} />
        </div>
      </Router>
    )
  }
}

export default Routes
