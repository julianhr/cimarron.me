import React from 'react'
import styled from '@emotion/styled'

import LabShowcase from './components/LabShowcase/LabShowcase'
import TopNav from '~/components/TopNav/TopNav'
import appStore from './reducers'
import withAppRoot from './components/library/withAppRoot'
import labs from './labs/labsData'


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
  { url: '/', label: 'Home' },
]

function App() {
  return (
    <Container>
      <Main>
        <TopNav menuItems={MENU_ITEMS} />
        <LabShowcase labs={labs} />
      </Main>
    </Container>
  )
}

export default withAppRoot(App, appStore)
