import React from 'react'
import styled from '@emotion/styled'

import ScrollerSelector from './ScrollerSelector'


const Root = styled.nav`
  grid-area: a1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${props => props.theme.queries.from('md')} {
    grid-row: 1 / span 1;
    grid-column: 1 / span 1;
  }
`

const H2 = styled.h2`
  font-size: 30px;
`

class TopNav extends React.PureComponent {
  render() {
    return (
      <Root>
        <H2>Infinite Scroller</H2>
        <ScrollerSelector />
      </Root>
    )
  }
}

export default TopNav
