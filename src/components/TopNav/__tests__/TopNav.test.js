import React from 'react'
import { mount } from 'enzyme'

import TopNav from '../TopNav'
import MockApp from '~/__tests__/__mocks__/MockApp'


describe('TopNav', () => {
  it('should match snapshot', () => {
    const wrapper = mount(<MockApp><TopNav /></MockApp>)
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })
})
