import React from 'react'
import { render } from 'enzyme'

import LabShowcase from '../LabShowcase'
import MockApp from '~/__tests__/__mocks__/MockApp'
import labsData from '~/__tests__/__fixtures__/labsDataFixture'


const renderApp = props => render(<MockApp><LabShowcase {...props} /></MockApp>)

describe('LabShowcase', () => {
  it('should match snapshot', () => {
    expect(renderApp({ labs: labsData })).toMatchSnapshot()
  })

  describe('props', () => {
    it('labs is required', () => {
      expect(() => renderApp()).toThrow()
    })
  })
})
