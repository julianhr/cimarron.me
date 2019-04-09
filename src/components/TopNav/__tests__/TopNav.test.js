import React from 'react'
import { mount } from 'enzyme'
import { create } from 'react-test-renderer'

import TopNav from '../TopNav'
import MockApp from '~/__tests__/__mocks__/MockApp'


const testProps = {
  menuItems: [
    { url: '/one/path', label: 'label 1', isLinkRouted: false },
  ]
}

const renderApp = (props) => create(<MockApp><TopNav {...props} /></MockApp>)

describe('TopNav', () => {
  describe('props', () => {
    it('requires menuItems', () => {
      const props = {...testProps}
      delete props.menuItems
      expect(() => renderApp(props)).toThrow()
    })
  })

  it('should match snapshot', () => {
    const wrapper = mount(<MockApp><TopNav {...testProps} /></MockApp>)
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })
})
