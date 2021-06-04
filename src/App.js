import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './components/Home'
import User from './components/User'

const App = () => {
  return (
    <Router>
      <Route path='/' exact component={Home}></Route>
      <Route path='/:username' exact component={User}></Route>
    </Router>
  )
}

export default App
