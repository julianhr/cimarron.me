import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'emotion-theming'
import { Global } from '@emotion/core'
import 'sanitize.css'

import appStore from '~/reducers'
import globalStyles from '~/styles/globalStyles'
import theme from '~/styles/theme'


function withAppRoot(WrappedComponent, otherProps={}) {
  return class extends React.Component {
    render() {
      return (
        <Provider store={appStore}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <Global styles={globalStyles} />
              <WrappedComponent {...this.props} {...otherProps} />
            </ThemeProvider>
          </BrowserRouter>
        </Provider>
      )
    }
  }
}

export default withAppRoot
