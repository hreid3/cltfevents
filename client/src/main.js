import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.__INITIAL_STATE__
const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
    MOUNT_NODE
  )
}

// ========================================================
// Go!
// ========================================================
render()

// Outside of react
const resetColspanBug = (e) => {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  if (w < 970) {
    document.querySelectorAll("tr.horace-1 td[colspan='9']").forEach((v) => (v.setAttribute('colspan', '4')))
  } else {
    document.querySelectorAll("tr.horace-1 td[colspan='4']").forEach((v) => (v.setAttribute('colspan', '9')))
  }
}

window.addEventListener("resize", (e) => resetColspanBug(e));
resetColspanBug();
