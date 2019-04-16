import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { create } from 'react-test-renderer'
import emotionSerializer from 'jest-emotion'

import Input from '../Input'
import MockApp from '~/__tests__/__mocks__/MockApp'


const testProps = {
  defaultValue: 'test value',
  errorTxt: 'invalid input',
  fwdRef: React.createRef(),
  inputProps: { size: 15 },
  labelTxt: 'test label',
  name: 'age',
  onChange: () => {},
  styles: {
    root: { background: 'yellow' },
    label: { color: 'green' },
    span: { color: 'orange' }
  },
  type: 'submit',
}

const createApp = (props) => create(<MockApp><Input {...props} /></MockApp>)
const renderApp = (props) => render(<MockApp><Input {...props} /></MockApp>)
const mountApp = (props) => mount(<MockApp><Input {...props} /></MockApp>)

describe('Input', () => {
  describe('props', () => {
    test('defaultValue is not required', () => {
      const props = {...testProps}
      delete props.defaultValue
      expect(() => createApp(props)).not.toThrow()
    })

    test('defaultValue can be a string', () => {
      const props = {...testProps}
      props.defaultValue = 'test default value'
      expect(() => createApp(props)).not.toThrow()
    })

    test('defaultValue can be a number', () => {
      const props = {...testProps}
      props.defaultValue = 543
      expect(() => createApp(props)).not.toThrow()
    })

    test('errorTxt is not required', () => {
      const props = {...testProps}
      delete props.errorTxt
      expect(() => createApp(props)).not.toThrow()
    })

    test('fwdRef is not required', () => {
      const props = {...testProps}
      delete props.fwdRef
      expect(() => createApp(props)).not.toThrow()
    })

    test('inputProps is not required', () => {
      const props = {...testProps}
      delete props.inputProps
      expect(() => createApp(props)).not.toThrow()
    })

    test('inputProps attributes are added to input field', () => {
      const wrapper = renderApp(testProps)
      expect(wrapper.find('input').attr('size')).toBe('' + testProps.inputProps.size)
    })

    test('labelTxt is not required', () => {
      const props = {...testProps}
      delete props.labelTxt
      expect(() => createApp(props)).not.toThrow()
    })

    test('name is required', () => {
      const props = {...testProps}
      delete props.name
      expect(() => createApp(props)).toThrow()
    })

    test('onChange is not required', () => {
      const props = {...testProps}
      delete props.onChange
      expect(() => createApp(props)).not.toThrow()
    })

    test('onChange is called when field changes', () => {
      const spy = jest.spyOn(testProps, 'onChange')
      const wrapper = mountApp(testProps)
      wrapper.find('input').simulate('change')
      expect(spy).toHaveBeenCalledTimes(1)
      wrapper.unmount()
    })

    test('styles is not required', () => {
      const props = {...testProps}
      delete props.styles
      expect(() => createApp(props)).not.toThrow()
    })

    test('type is not required', () => {
      const props = {...testProps}
      delete props.type
      expect(() => createApp(props)).not.toThrow()
    })

    test('type defaults to text', () => {
      const props = {...testProps}
      delete props.type
      const wrapper = renderApp(props)
      expect(wrapper.find('#age').attr('type')).toEqual('text')
    })
  })

  describe('erorr highlighting', () => {
    it('snapshot when there is error text', () => {
      const props = {...testProps}
      delete props.errorTxt
      expect.addSnapshotSerializer(emotionSerializer)
      expect(createApp(props)).toMatchSnapshot()
    })

    it('snapshot without error txt', () => {
      const props = {...testProps}
      props.errorTxt = 'test error message'
      expect.addSnapshotSerializer(emotionSerializer)
      expect(createApp(props)).toMatchSnapshot()
    })
  })
})
