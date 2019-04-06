import React from 'react'
import { render } from 'enzyme'

import LabShowcase from '../LabShowcase'
import withAppRoot from '~/components/library/withAppRoot'
import labsData from '~/__tests__/__fixtures__/labsDataFixture'


describe('LabShowcase', () => {
  it('should match snapshot', () => {
    const RootedLabShowcase = withAppRoot(LabShowcase, { labs: labsData })
    const wrapper = render(<RootedLabShowcase />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('required props', () => {
    it('labs', () => {
      const RootedLabShowcase = withAppRoot(LabShowcase)
      expect(() => render(<RootedLabShowcase />)).toThrow()
    })
  })
})
