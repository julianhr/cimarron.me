import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { create } from 'react-test-renderer'
import emotionSerializer from 'jest-emotion'

import Button from '../Button'
import MockApp from '~/__tests__/__mocks__/MockApp'


const testProps = {
  btnStyle: { color: 'green' },
  fwdRef: React.createRef(),
  onClick: () => {},
  type: 'submit',
}

const buttonText = 'Hello!'

const createApp = (props, text) => create(
  <MockApp>
    <Button {...props}>
      {text}
    </Button>
  </MockApp>
)

const mountApp = (props, text) => mount(
  <MockApp>
    <Button {...props}>
      {text}
    </Button>
  </MockApp>
)

describe('Button', () => {
  describe('props', () => {
    test('btnStyle not required', () => {
      const props = {...testProps}
      delete props.btnStyle
      expect(() => createApp(props, buttonText)).not.toThrow()
    })

    test('children is required', () => {
      expect(() => create(
        <MockApp><Button {...testProps} /></MockApp>)).toThrow()
    })

    test('fwdRef is not required', () => {
      expect(() => createApp(testProps, buttonText)).not.toThrow()
    })

    test('onClick is not required', () => {
      const props = {...testProps}
      delete props.onClick
      expect(() => createApp(props, buttonText)).not.toThrow()
    })

    test('type is not required', () => {
      const props = {...testProps}
      delete props.type
      expect(() => createApp(props, buttonText)).not.toThrow()
    })
  })

  describe('snapshots', () => {
    test('with all props', () => {
      expect.addSnapshotSerializer(emotionSerializer)
      const wrapper = mountApp(testProps, buttonText)
      expect(wrapper).toMatchSnapshot()
      wrapper.unmount()
    })

    test('with required props', () => {
      const props = { onClick: testProps.onClick }
      const wrapper = mountApp(props, buttonText)

      expect.addSnapshotSerializer(emotionSerializer)
      expect(wrapper).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('calls onClick callback when button is clicked', () => {
    const spy = jest.spyOn(testProps, 'onClick')
    const wrapper = mountApp(testProps, buttonText)
    wrapper.find('button').simulate('click')
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
