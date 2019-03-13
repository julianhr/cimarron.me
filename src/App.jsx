import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'


const Container = styled.div`
  display: grid;
  grid:
    "left-blank main right-blank" 100vh
    / auto minmax(auto, 1000px) auto;
`

const Main = styled.main`
  grid-area: main;
`

function App() {
  return (
    <Container>
      <Main>
        Testing App
      </Main>
    </Container>
  )
}

export default App
