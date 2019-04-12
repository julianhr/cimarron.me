import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { create } from 'react-test-renderer'

import AnchorTag from '../AnchorTag'
import MockApp from '~/__tests__/__mocks__/MockApp'


const testProps = {
  url: 'http://test.com',
  rootStyle: { background: '#CBA' },
  isLinkRouted: false,
}

// AnchorTag requires the react router
const renderComponent = props => create(<MockApp><AnchorTag {...props} /></MockApp>)

describe('AnchorTag', () => {
  describe('props', () => {
    it('requires url', () => {
      const props = {...testProps}
      delete props.url
      expect(() => renderComponent(props)).toThrow()
    })

    it('rootStyle not required', () => {
      const props = {...testProps}
      delete props.rootStyle
      expect(() => renderComponent(props)).not.toThrow()

    })
    it('isLinkRouted not required', () => {
      const props = {...testProps}
      delete props.isLinkRouted
      expect(() => renderComponent(props)).not.toThrow()
    })
  })

  describe('snapshots', () => {
    it('matches with all props', () => {
      const wrapper = mount(<MockApp><AnchorTag {...testProps}/></MockApp>)
      expect(wrapper).toMatchSnapshot()
      wrapper.unmount()
    })

    it('matches with required props', () => {
      const props = { url: testProps.url }
      const wrapper = mount(<MockApp><AnchorTag {...props}/></MockApp>)
      expect(wrapper).toMatchSnapshot()
      wrapper.unmount()
    })
  })
})

