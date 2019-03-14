import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import TopNav from './components/TopNav/TopNav'
import LabRoutes from './components/LabRoutes/LabRoutes'


const Container = styled.div`
  display: grid;
  grid:
    "left-blank main right-blank" 100vh
    / auto minmax(auto, 1000px) auto;
`

const Main = styled.main`
  grid-area: main;
`

class App extends React.Component {
  render() {
    return (
      <Container>
        <Main>
          <TopNav />
          <LabRoutes pathname={location.pathname} />
        </Main>
      </Container>
    )
  }
}

export default App
