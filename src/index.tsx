import React from 'react'
import ReactDOM from 'react-dom'
import { Scene } from './Scene'
import './style.css'
import * as serviceWorker from './serviceWorker'

const render = (Component: any) =>
  ReactDOM.render(<Component />, document.getElementById('root'))

render(Scene)

if (module.hot) {
  module.hot.accept('./Scene', () => {
    const HotScene = require('./Scene').default
    render(HotScene)
  })
}

serviceWorker.unregister()
