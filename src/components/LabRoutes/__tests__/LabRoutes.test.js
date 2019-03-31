import React from 'react'
import { create } from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'emotion-theming'
import { shallow, render } from 'enzyme'

import theme from '~/styles/theme'
import LabRoutes from '../LabRoutes'
import labsData from '~/__tests__/__fixtures__/labsDataFixture'
import TestCompSync from '~/__tests__/__fixtures__/TestComp2'


function TestLabRoutes({ labs, path }) {
  return (
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>
        <LabRoutes labs={labs} />
      </MemoryRouter>
    </ThemeProvider>
  )
}

describe('LabRoutes', () => {
  describe('snapshots', () => {
    it('route to Home', () => {
      const root = create(<TestLabRoutes labs={labsData} path={'/'} />)
      expect(root).toMatchSnapshot()
    })

    // React.lazy is not supported yet since Jest relies on SSR
    // https://github.com/facebook/react/pull/14626#issuecomment-458959723
    // https://github.com/airbnb/enzyme/pull/1975
    // TODO: revisit at a later point
    it.skip('route to component resolved by Suspense', async () => {
      const lab1 = labsData[0]
      lab1.component = React.lazy(() => import('~/__tests__/__fixtures__/TestComp1'))
      await lab1.component
      const wrapper = create(<TestLabRoutes labs={labsData} path={lab1.urlPath} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('loading state', async () => {
      const lab1 = labsData[0]
      lab1.component = React.lazy(() => new Promise(resolve => setTimeout(() => TestCompSync, 500)))
      const wrapper = create(<TestLabRoutes labs={labsData} path={lab1.urlPath} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
