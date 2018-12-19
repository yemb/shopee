import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Detail from './pages/detail'
import List from './pages/list'
import Login from './pages/login'
import Me from './pages/me'

// import store from './store'

class App extends React.Component {
  public render() {
    return (
        <BrowserRouter>
          <div>
            <Route path='/' exact={true} component={Login} />
            <Route path='/login' exact={true} component={Login} />
            <Route path='/list' exact={true} component={List} />
            <Route path='/me' exact={true} component={Me} />
            <Route path='/detail/:id' exact={true} component={Detail} />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
