import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { create } from 'react-test-renderer'

import { ScrollerSelector, SCROLLERS } from '../ScrollerSelector'
import RootMock from '../../__tests__/__mocks__/RootMock'


describe('ScrollerSelector', () => {
  const testProps = {
    setScrollerType: () => {},
    scrollerType: Object.keys(SCROLLERS[0])[0],
  }

  const renderer = (props) => mount(<RootMock><ScrollerSelector {...props} /></RootMock>)

  describe('props', () => {
    test('setScrollerType is required', () => {
      const props = {...testProps}
      delete props.setScrollerType
      expect(() => renderer(props)).toThrow()
    })

    test('scrollerType is required', () => {
      const props = {...testProps}
      delete props.scrollerType
      expect(() => renderer(props)).toThrow()
    })
  })

  describe('snapshots', () => {
    it('matches with all props', () => {
      const wrapper = renderer(testProps)
      expect(wrapper).toMatchSnapshot()
      wrapper.unmount()
    })
  })
})
