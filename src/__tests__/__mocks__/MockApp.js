import React from 'react'

import withAppRoot from '~/components/library/withAppRoot'
import appStore from '~/reducers'


function MockApp({ children }) {
  return (
    <>
      {children}
    </>
  )
}

export default withAppRoot(MockApp, appStore)
