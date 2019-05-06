import React from 'react'
import styled from '@emotion/styled'

import PageNav from './PageNav/PageNav'
import Description from './Description/Description'
import Scrollers from './Scrollers/Scrollers'
import labStore from './reducers'
import withAppRoot from '~/library/withAppRoot'
import withLabShell from '~/library/withLabShell'


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
    <Root>
      <div>
        <PageNav />
        <Description />
      </div>
      <Scrollers />
    </Root>
  )
}

export default withAppRoot(withLabShell(InfiniteScroller), labStore)
