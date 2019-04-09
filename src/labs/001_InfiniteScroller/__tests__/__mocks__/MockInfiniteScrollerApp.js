import React from 'react'
import labStore from '../../reducers'
import withAppRoot from '~/components/library/withAppRoot'


function MockInfiniteScrollerApp({ children }) {
  return (
    <>
      {children}
    </>
  )
}

export default withAppRoot(MockInfiniteScrollerApp, labStore)
