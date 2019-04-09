import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { create } from 'react-test-renderer'
import { StaticRouter } from 'react-router-dom'

import MenuItem from '../MenuItem'
import MockApp from '~/__tests__/__mocks__/MockApp'


const testProps = {
  url: '/some/test/path',
  label: 'test label',
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
  })

  describe.only('snapshots', () => {
    it('matches when path includes labs', () => {
      const props = {...testProps}
      props.url = '/labs/someproject'
      const wrapper = mount(
        <MockApp>
          <MenuItem {...props} />
        </MockApp>
      )
      expect(wrapper).toMatchSnapshot()
      wrapper.unmount()
    })

    it('matches when path does not include labs', () => {
      const props = {...testProps}
      props.url = '/diff/someproject'
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
