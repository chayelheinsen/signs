import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Home from './components/home'
import Login from './components/login'
import NoMatch from './components/no_match'

const App = (props) => (
  <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path="*" status={404} component={NoMatch}/>
    </Switch>
  </Router>
)

export default App