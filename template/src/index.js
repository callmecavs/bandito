import React from 'react'
import ReactDOM from 'react-dom'

import {
  Router,
  Route,
  browserHistory as History
} from 'react-router'

import Main from './components/Main.js'

const routing = (
  <Router history={ History }>
    <Route path="/" component={ Main }/>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
)
