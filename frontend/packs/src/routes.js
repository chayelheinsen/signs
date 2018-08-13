import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Home from './components/home';

const App = (props) => (
  <Router>
    <Route exact path='/' component={Home} />
  </Router>
)

export default App;