import React from 'react'

import {
  Router,
  Route,
  browserHistory as History
} from 'react-router'

import Main from '../components/Main/Main.js'

const routes = (
  <Router history={ History }>
    <Route path="/" component={ Main }/>
  </Router>
)

export default routes
