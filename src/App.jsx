import React, { Suspense } from 'react'
import styled from '@emotion/styled'
import { Switch, Route } from 'react-router-dom'

import ErrorBoundary from './library/ErrorBoundary'
import LabShowcase from './components/LabShowcase/LabShowcase'
import TopNav from '~/components/TopNav/TopNav'
import Loading from './components/Loading/Loading'
import appStore from './reducers'
import withAppRoot from './library/withAppRoot'
import labs from './labs/labsData'
// Lazy loaded
const About = React.lazy(() => import(/* webpackChunkName: 'About' */ './components/About/About'))


const Container = styled.div`
  display: grid;
  grid:
    "left-blank main right-blank" 100vh
    / auto minmax(auto, 1000px) auto;
`

const Main = styled.main`
  grid-area: main;
  grid:
    "header" 100%
    "body" 100%
    "footer" 100%
    / auto;
`

const Body = styled.section`
  grid-area: body;
  padding: 0 10px;
`

const Footer = styled.footer`
  grid-area: footer;
  height: 100px;
`

const MENU_ITEMS = [
  { url: '/about', label: 'About' },
]

const LabShowcaseWithProps = () => <LabShowcase labs={labs} />

function App() {
  return (
    <Container>
      <Main>
        <TopNav
          menuItems={MENU_ITEMS}
        />
        <Body>
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path='/' component={LabShowcaseWithProps} />
                <Route path='/about' component={About} />
              </Switch>
            </Suspense>
          </ErrorBoundary>
        </Body>
        <Footer />
      </Main>
    </Container>
  )
}

export default withAppRoot(App, appStore)
