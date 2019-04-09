import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { create } from 'react-test-renderer'

import MenuItem from '../MenuItem'
import MockApp from '~/__tests__/__mocks__/MockApp'


const testProps = {
  url: '/some/test/path',
  label: 'test label',
  isLinkRouted: false,
}

const renderApp = props => create(<MockApp><MenuItem {...props} /></MockApp>)

describe('MenuItem', () => {
  describe('props', () => {
    it('requires url', () => {
      const props = {...testProps}
      delete props.url
      expect(() => renderApp(props)).toThrow()
    })

    it('requires label', () => {
      const props = {...testProps}
      delete props.label
      expect(() => renderApp(props)).toThrow()
    })

    it('isLinkRouted is not required', () => {
      const props = {...testProps}
      delete props.isLinkRouted
      expect(() => renderApp(props)).not.toThrow()
    })
  })

  describe('snapshots', () => {
    it('isLinkRouted == false', () => {
      const props = {...testProps}
      props.isLinkRouted = false
      const wrapper = mount(
        <MockApp>
          <MenuItem {...props} />
        </MockApp>
      )
      expect(wrapper).toMatchSnapshot()
      wrapper.unmount()
    })

    it('isLinkRouted == true', () => {
      const props = {...testProps}
      props.isLinkRouted = true
      const wrapper = mount(
        <MockApp>
          <MenuItem {...props} />
        </MockApp>
      )
      expect(wrapper).toMatchSnapshot()
      wrapper.unmount()
    })
  })
})
