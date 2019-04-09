import React from 'react'
import styled from '@emotion/styled'

import TopNav from '~/components/TopNav/TopNav'
import withAppRoot from '~/components/library/withAppRoot'

const Container = styled.div`
  display: grid;
  grid:
    "left-blank main right-blank" 100vh
    / auto minmax(auto, 1000px) auto;
`

const Main = styled.main`
  grid-area: main;
`

function withAppShell(WrappedElement) {
  return class extends React.Component {
    render() {
      return (
        <Container>
          <Main>
            <TopNav />
            <WrappedElement {...this.props} />
          </Main>
        </Container>
      )
    }
  }
}

export default withAppShell
