import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'

import 'bootstrap/dist/css/bootstrap.css'
import 'assets/scss/paper-dashboard.scss?v=1.3.0'
import 'assets/demo/demo.css'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

import AdminLayout from 'layouts/Admin.js'
import { Login, Success, Fail, Unfinish } from './views'
import { checkLogin } from 'store/actions'
import store from './store'

const history = createBrowserHistory()

store.dispatch(checkLogin())

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path='/admin' render={(props) => <AdminLayout {...props} />} />
        <Route path='/login' component={Login} exact />
        <Route path='/payment/success' component={Success} exact />
        <Route path='/payment/error' component={Fail} exact />
        <Route path='/payment/unfinish' component={Unfinish} exact />
        <Redirect to='/login' />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)
