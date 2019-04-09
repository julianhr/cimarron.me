import React from 'react'
import { Provider } from 'react-redux'
import styled from '@emotion/styled'

import infiniteScollerStore from './reducers'
import PageNav from './PageNav/PageNav'
import Description from './Description/Description'
import Scrollers from './Scrollers/Scrollers'
import labStore from './reducers'
import withAppRoot from '~/components/library/withAppRoot'
import withLabShell from '~/components/library/withLabShell'


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

export function InfiniteScroller() {
  return (
    <Provider store={infiniteScollerStore}>
      <Root>
        <div>
          <PageNav />
          <Description />
        </div>
        <Scrollers />
      </Root>
    </Provider>
  )
}

export default withAppRoot(withLabShell(InfiniteScroller), labStore)
