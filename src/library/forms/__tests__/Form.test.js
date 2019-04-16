import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { create } from 'react-test-renderer'
import emotionSerializer from 'jest-emotion'

import Form, { handleFormOnKeyPress } from '../Form'
import MockApp from '~/__tests__/__mocks__/MockApp'


const testProps = {
  formStyle: { color: 'green' },
  onSubmit: () => {},
}

const createApp = (props) => create(
  <MockApp>
    <Form {...props}>
      <input type="text" defaultValue="test value"/>
    </Form>
  </MockApp>
)

const mountApp = (props) => mount(
  <MockApp>
    <Form {...props}>
      <input type="text" defaultValue="test value"/>
    </Form>
  </MockApp>
)

describe('Form', () => {
  describe('props', () => {
    test('formStyle is not required', () => {
      const props = {...testProps}
      delete props.formStyle
      expect(() => createApp(props)).not.toThrow()
    })

    it('incorporates formStyle if passed', () => {
      const props = {...testProps}
      props.formStyle = { color: 'salmon' }
      expect.addSnapshotSerializer(emotionSerializer)
      expect(createApp(props)).toMatchSnapshot()
    })

    test('onSubmit is required', () => {
      const props = {...testProps}
      delete props.onSubmit
      expect(() => createApp(props)).toThrow()
    })

    it('calls onSubmit function when form is submitted', () => {
      const spy = jest.spyOn(testProps, 'onSubmit')
      const wrapper = mountApp(testProps)
      wrapper.find('form').simulate('submit')
      expect(spy).toHaveBeenCalledTimes(1)
      wrapper.unmount()
    })

    test('children is required', () => {
      expect(() => create(<MockApp><Form {...testProps} /></MockApp>)).toThrow()
    })

    test('children can be an element', () => {
      expect(() => create(
        <MockApp>
          <Form {...testProps}>
            <input type="text" defaultValue="test value"/>
          </Form>
        </MockApp>)
      ).not.toThrow()
    })

    test('children can be a fragment', () => {
      expect(() => create(
        <MockApp>
          <Form {...testProps}>
            <>
              <input type="text" defaultValue="test value 1"/>
              <input type="text" defaultValue="test value 1"/>
            </>
          </Form>
        </MockApp>)
      ).not.toThrow()
    })
  })

  describe('helpers', () => {
    describe('handleFormOnKeyPress', () => {
      it('returns null if key pressed is not Enter', () => {
        const fakeEvent = { key: 'a', target: { type: 'textarea' } }
        expect(handleFormOnKeyPress(fakeEvent)).toBe(null)
      })

      it('does nothing if element is not a textarea', () => {
        const spy = jest.fn()
        const fakeEvent = { key: 'Enter', target: { type: 'input' }, stopPropagation: spy }
        handleFormOnKeyPress(fakeEvent)
        expect(spy).not.toHaveBeenCalled()
      })

      it('calls stopPropagation if element is textarea', () => {
        const spy = jest.fn()
        const fakeEvent = { key: 'Enter', target: { type: 'textarea' }, stopPropagation: spy }
        handleFormOnKeyPress(fakeEvent)
        expect(spy).toHaveBeenCalled()
      })
    })
  })
})
