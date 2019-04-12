import React from 'react'
import labStore from '../../reducers'
import withAppRoot from '~/library/withAppRoot'


function MockInfiniteScrollerApp({ children }) {
  return (
    <>
      {children}
    </>
  )
}

export default withAppRoot(MockInfiniteScrollerApp, labStore)
