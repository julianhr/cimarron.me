import React from 'react'
import * as Sentry from '@sentry/browser'


class ErrorBoundary extends React.Component {
  state = {
    error: null,
    eventId: null,
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error })

    Sentry.withScope(scope => {
      scope.setExtras(errorInfo)
      const eventId = Sentry.captureException(error)
      this.setState({ eventId })
    })
  }

  render() {
    if (this.state.error) { return null }
    else { return this.props.children }
  }
}

export default ErrorBoundary
