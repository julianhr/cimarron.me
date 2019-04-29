import React from 'react'
import { mount } from 'enzyme'
import { create } from 'react-test-renderer'

import TopNav from '../TopNav'
import MockApp from '~/__tests__/__mocks__/MockApp'


const testProps = {
  isLinkRouted: false,
  menuItems: [
    { url: '/one/path', label: 'label 1', isLinkRouted: false },
    { url: '/two/path', label: 'label 2', isLinkRouted: true },
  ],
}

const createApp = (props) => create(<MockApp><TopNav {...props} /></MockApp>)

describe('TopNav', () => {
  describe('props', () => {
    test('menuItems is required', () => {
      const props = {...testProps}
      delete props.menuItems
      expect(() => createApp(props)).toThrow()
    })

    test('isLogoLinkRouted defaults to true', () => {
      const props = {...testProps}
      delete props.isLogoLinkRouted
      const wrapper = createApp(props)
      const topNav = wrapper.root.findByType(TopNav)
      expect(topNav.props.isLogoLinkRouted).toBe(true)
    })
  })

  it('should match snapshot', () => {
    const wrapper = mount(<MockApp><TopNav {...testProps} /></MockApp>)
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })
})
