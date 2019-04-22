import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { create } from 'react-test-renderer'
import faker from 'faker'

import EmailForm from '../EmailForm'
import MockApp from '~/__tests__/__mocks__/MockApp'


faker.seed(500)

const defaultValues = {
  email: faker.internet.email(),
  name: faker.name.findName(),
  subject: faker.lorem.sentence(6),
  message: faker.lorem.sentence(100),
}

const formRefs = {
  email: React.createRef(),
  name: React.createRef(),
  subject: React.createRef(),
  message: React.createRef(),
}

const testProps = {
  defaultValues,
  fieldErrors: {},
  formRefs,
  onFieldChange: () => {},
  onSubmit: () => {},
  SubmitButton: () => (<button>Test</button>),
}

const createApp = (props) => create(<MockApp><EmailForm {...props} /></MockApp>)

describe('EmailForm', () => {
  describe('props', () => {
    test('no exception when all required are passed', () => {
      expect(() => createApp(testProps)).not.toThrow()
    })

    test('defaultValues is required', () => {
      const props = {...testProps}
      delete props.defaultValues
      expect(() => createApp(props)).toThrow()
    })

    test('fieldErrors is required', () => {
      const props = {...testProps}
      delete props.fieldErrors
      expect(() => createApp(props)).toThrow()
    })

    test('formRefs is required', () => {
      const props = {...testProps}
      delete props.formRefs
      expect(() => createApp(props)).toThrow()
    })

    test('onFieldChange is required', () => {
      const props = {...testProps}
      delete props.onFieldChange
      expect(() => createApp(props)).toThrow()
    })

    test('onSubmit is required', () => {
      const props = {...testProps}
      delete props.onSubmit
      expect(() => createApp(props)).toThrow()
    })

    test('SubmitButton is required', () => {
      const props = {...testProps}
      delete props.SubmitButton
      expect(() => createApp(props)).toThrow()
    })
  })

  it('matches snapshot', () => {
    const wrapper = createApp(testProps)
    expect(wrapper).toMatchSnapshot()
  })
})
