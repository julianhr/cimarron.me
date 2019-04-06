import React from 'react'
import { Provider } from 'react-redux'
import infiniteScollerStore from '../../reducers'
import withAppRoot from '~/components/library/withAppRoot'
import { isExpressionWrapper } from '@babel/types';


function RootMock({ children }) {
  return (
    <Provider store={infiniteScollerStore}>
      {children}
    </Provider>
  )
}

export default withAppRoot(RootMock)

