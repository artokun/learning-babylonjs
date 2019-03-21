import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import './style.css'
import * as serviceWorker from './serviceWorker'

const render = (Component: any) =>
  ReactDOM.render(<Component />, document.getElementById('root'))

render(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    const HotApp = require('./App').default
    render(HotApp)
  })
}

serviceWorker.unregister()
