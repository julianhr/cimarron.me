import React from 'react'
import { render } from 'enzyme'

import LabShowcase from '../LabShowcase'
import withAppRoot from '~/components/library/withAppRoot'
import labsData from '~/__tests__/__fixtures__/labsDataFixture'
import throwPropErrorsMock from '~/__tests__/__mocks__/throwPropErrorsMock'


describe('LabShowcase', () => {
  it('should match snaspshot', () => {
    const RootedLabShowcase = withAppRoot(LabShowcase, { labs: labsData })
    const wrapper = render(<RootedLabShowcase />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('required props', () => {
    beforeAll(() => {
      throwPropErrorsMock()
    })

    it('labs', () => {
      const RootedLabShowcase = withAppRoot(LabShowcase)
      expect(() => render(<RootedLabShowcase />)).toThrow()
    })
  })
})
