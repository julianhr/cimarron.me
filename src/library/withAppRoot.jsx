import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'emotion-theming'
import { Global } from '@emotion/core'
import 'sanitize.css'

import globalStyles from '~/styles/globalStyles'
import theme from '~/styles/theme'


function withAppRoot(WrappedComponent, store) {
  return class extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <Global styles={globalStyles} />
              <WrappedComponent {...this.props} />
            </ThemeProvider>
          </BrowserRouter>
        </Provider>
      )
    }
  }
}

export default withAppRoot
