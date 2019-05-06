import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/browser'

import App from './App'
import ErrorBoundary from './library/ErrorBoundary'


const isProduction = process.env.NODE_ENV === 'production'

Sentry.init({
  dsn: isProduction && process.env.SENTRY_DSN,
  debug: !isProduction,
  environment: process.env.NODE_ENV,
  release: process.env.COMMIT_HASH,
})

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('root')
)

document.querySelector('body').setAttribute('data-commit-hash', process.env.COMMIT_HASH)
