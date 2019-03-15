import React from 'react'
import { Provider } from 'react-redux'
import styled from '@emotion/styled'

import infiniteScollerStore from './reducers'
import PageNav from './PageNav/PageNav'
import Description from './Description/Description'
import Scrollers from './Scrollers/Scrollers'


const Root = styled.section`
  /* grid */
  display: grid;
  grid:
    "a1" auto
    "b1" auto
    "c1" auto
    / auto;
  /* else */
  width: 100%;
  max-width: ${props => props.theme.breaks.lg}px;
  padding: 40px 10px 10px;

  ${props => props.theme.queries.from('md')} {
    grid:
      15vh
      80vh
      / 40% 60%;
  }
`

function Index() {
  return (
    <Provider store={infiniteScollerStore}>
      <Root>
        <PageNav />
        <Description />
        <Scrollers />
      </Root>
    </Provider>
  )
}

export default Index
