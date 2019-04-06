import React from 'react'
import { Provider } from 'react-redux'
import styled from '@emotion/styled'

import infiniteScollerStore from './reducers'
import PageNav from './PageNav/PageNav'
import Description from './Description/Description'
import Scrollers from './Scrollers/Scrollers'


const Root = styled.section`
  width: 100%;
  max-width: ${props => props.theme.breaks.lg}px;
  padding: 40px 10px 10px;

  ${props => props.theme.queries.from('md')} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 60px 10px 10px;
  }
`

const RowA1 = styled.div`
`

function InfiniteScroller() {
  return (
    <Provider store={infiniteScollerStore}>
      <Root>
        <RowA1>
          <PageNav />
          <Description />
        </RowA1>
        <Scrollers />
      </Root>
    </Provider>
  )
}

export default InfiniteScroller
