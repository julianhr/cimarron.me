import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { create } from 'react-test-renderer'

import Selector from '../Selector'
import RootMock from '../../__tests__/__mocks__/RootMock'


describe('Selector', () => {
  const testProps = {
    label: 'test label',
    keys: 'a b c'.split(' '),
    titles: 'A B C'.split(' '),
    selected:  'B',
    onChange:  () => 'test onChange',
  }

  const renderer = (props) => mount(<RootMock><Selector {...props} /></RootMock>)
  let wrapper

  afterEach(() => {
    if (wrapper) { wrapper.unmount() }
  })

  describe('props', () => {
    test('label is required', () => {
      const props = {...testProps}
      delete props.label
      expect(() => renderer(props)).toThrow()
    })

    test('keys is required', () => {
      const props = {...testProps}
      delete props.keys
      expect(() => renderer(props)).toThrow()
    })

    test('titles is required', () => {
      const props = {...testProps}
      delete props.titles
      expect(() => renderer(props)).toThrow()
    })

    test('selected is not required', () => {
      const props = {...testProps}
      delete props.selected
      expect(() => renderer(props)).not.toThrow()
    })

    test('onChange is required', () => {
      const props = {...testProps}
      delete props.onChange
      expect(() => renderer(props)).toThrow()
    })
  })

  describe('snapshots', () => {
    it('with all props', () => {
      wrapper = renderer(testProps)
      expect(wrapper).toMatchSnapshot()
    })

    it('without selected prop', () => {
      const props = {...testProps}
      delete props.selected
      wrapper = renderer(props)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('integration', () => {
    it('calls #onChange when `select` changes ', () => {
      const mockOnChange = jest.spyOn(testProps, 'onChange')
      wrapper = renderer(testProps)
      wrapper.find('select').simulate('change', '')
      expect(mockOnChange).toHaveBeenCalled()
    })
  })
})
