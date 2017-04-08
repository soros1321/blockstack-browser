import React                        from 'react'
import { render }                   from 'react-dom'
import { Provider }                 from 'react-redux'

import routes                       from './routes'
import configureDataStore           from './store/configure/index'
import log4js                       from './utils/logging-utils'



window.addEventListener('error', (event) => {
  const logger = log4js.getLogger('window.addWindowListener(\'error\')')
  logger.error(event)
})

window.onerror = (messageOrEvent, source, lineno, colno, error) => {
  const logger = log4js.getLogger('window.onerror')
  logger.error(messageOrEvent, error)
}

const logger = log4js.getLogger('index.js')
const store = configureDataStore()

if (process.env.NODE_ENV !== 'production') {
  logger.trace('NODE_ENV is not production')
  logger.debug('Enabling React devtools')
  window.React = React
}

render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app')
)
