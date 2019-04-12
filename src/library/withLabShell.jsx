import React from 'react'
import styled from '@emotion/styled'

import TopNav from '~/components/TopNav/TopNav'

const Container = styled.div`
  display: grid;
  grid:
    "left-blank main right-blank" 100vh
    / auto minmax(auto, 1000px) auto;
`

const Main = styled.main`
  grid-area: main;
`

const MENU_ITEMS = [
  { url: '/', label: 'Home', isLinkRouted: false },
]

function withLabShell(WrappedElement) {
  return class extends React.Component {
    render() {
      return (
        <Container>
          <Main>
            <TopNav menuItems={MENU_ITEMS} />
            <WrappedElement {...this.props} />
          </Main>
        </Container>
      )
    }
  }
}

export default withLabShell
