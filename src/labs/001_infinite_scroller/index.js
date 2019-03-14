import React from 'react'
import { Provider } from 'react-redux'

import infiniteScollerStore from './reducers'
import PageNav from './PageNav/PageNav'
import Description from './Description/Description'
import Scrollers from './Scrollers/Scrollers'


function Index() {
  return (
    <Provider store={infiniteScollerStore}>
      <PageNav />
      <Description />
      <Scrollers />
    </Provider>
  )
}

export default Index
