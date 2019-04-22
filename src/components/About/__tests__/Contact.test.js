import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { create } from 'react-test-renderer'

import Contact from '../Contact'
import MockApp from '~/__tests__/__mocks__/MockApp'
import { sleep } from '~/__tests__/utils'
import { ERRORS } from '../fieldErrorFuncs'
import { urlBuilder } from '~/utils'


const createApp = () => create(<MockApp><Contact /></MockApp>)

describe('Contact', () => {
  const { fetch: origFetch } = global
  const fetchedToken = { token: '123456789' }

  beforeAll(() => {
    global.fetch = async () => ({ ok: true, json: async () => fetchedToken })
  })

  afterAll(() => {
    global.fetch = origFetch
  })

  describe('#setCsrfToken', () => {
    it('sets csrf token in state', async () => {
      const { instance } = createApp().root.findByType(Contact)
      instance.setCsrfToken()
      await sleep(20)
      expect(instance.state.fieldValues.csrf_token).toEqual(fetchedToken.token)
    })
  })

  describe('#handleFieldOnChange', () => {
    it('calls debouced function #debFieldOnChange', () => {
      const mockEvent = { target: { name: 'fieldName', value: 'fieldValue' } }
      const { instance } = createApp().root.findByType(Contact)
      const spy = jest.spyOn(instance, 'debFieldOnChange')

      instance.handleFieldOnChange(mockEvent)
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(mockEvent.target.name, mockEvent.target.value)
    })
  })

  describe('#debFieldOnChange', () => {
    const fieldValues = {
      csrf_token: fetchedToken.token,
      email: '',
      name: 'Julian',
      subject: 'Hi',
      message: 'test message'
    }

    it('is debounced', async () => {
      const { instance } = createApp().root.findByType(Contact)
      instance.formRefs.email.current = { focus: () => {} }
      jest.spyOn(instance, 'render').mockReturnValue(null)  // render nullifies refs
      instance.setState({ wasFormSubmitted: true, fieldValues, fieldErrors: {} })
      await sleep(30)
      let partialEmail = 'longusername@'
      let expectedFieldValues = { ...fieldValues, email: partialEmail }

      instance.debFieldOnChange('email', partialEmail)
      expect(instance.state.fieldValues).not.toEqual(expectedFieldValues)
      expect(instance.state.fieldErrors).not.toEqual({ email: ERRORS.email() })

      await sleep(100)
      expect(instance.state.fieldValues).not.toEqual(expectedFieldValues)
      expect(instance.state.fieldErrors).not.toEqual({ email: ERRORS.email() })

      await sleep(100)
      expect(instance.state.fieldValues).toEqual(expectedFieldValues)
      expect(instance.state.fieldErrors).toEqual({ email: ERRORS.email() })
    })

    describe('not submitted', () => {
      it('updates field value but does not set errors', async () => {
        const { instance } = createApp().root.findByType(Contact)
        const partialEmail = 'test@'
        const expectedFieldValues = { ...fieldValues, email: partialEmail }

        instance.setState({ wasFormSubmitted: false, fieldValues, fieldErrors: {} })
        instance.debFieldOnChange('email', partialEmail)

        await sleep(200)
        expect(instance.state.fieldValues).toEqual(expectedFieldValues)
        expect(instance.state.fieldErrors).toEqual({})
      })
    })

    describe('submit attempted', () => {
      it('updates field value and error if any', async () => {
        const { instance } = createApp().root.findByType(Contact)
        instance.formRefs.email.current = { focus: () => {} }
        jest.spyOn(instance, 'render').mockReturnValue(null)  // render nullifies refs
        instance.setState({ wasFormSubmitted: true, fieldValues, fieldErrors: {} })

        let partialEmail = 'longusername@'
        let expectedFieldValues = { ...fieldValues, email: partialEmail }
        instance.debFieldOnChange('email', partialEmail)
        await sleep(200)
        expect(instance.state.fieldValues).toEqual(expectedFieldValues)
        expect(instance.state.fieldErrors).toEqual({ email: ERRORS.email() })

        partialEmail = 'longusername@email'
        expectedFieldValues = { ...fieldValues, email: partialEmail }
        instance.debFieldOnChange('email', partialEmail)
        await sleep(200)
        expect(instance.state.fieldValues).toEqual(expectedFieldValues)
        expect(instance.state.fieldErrors).toEqual({ email: ERRORS.email() })

        partialEmail = ''
        expectedFieldValues = { ...fieldValues, email: partialEmail }
        instance.debFieldOnChange('email', partialEmail)
        await sleep(200)
        expect(instance.state.fieldValues).toEqual(expectedFieldValues)
        expect(instance.state.fieldErrors).toEqual({ email: ERRORS.required() })
      })

      it('moves focus to current field', async () => {
        const { instance } = createApp().root.findByType(Contact)
        const email = 'test@email.com'
        const mockFocus = jest.fn()
        instance.formRefs.email.current = { focus: mockFocus }
        jest.spyOn(instance, 'render').mockReturnValue(null)  // render nullifies refs
        instance.setState({ wasFormSubmitted: true, fieldValues, fieldErrors: {} })
        instance.debFieldOnChange('email', email)

        await sleep(200)
        expect(mockFocus).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('#setFieldErrors', () => {
    it('sets field errors in state', async () => {
      const { instance } = createApp().root.findByType(Contact)
      const startFieldErrors = {}
      Object.entries(instance.state.fieldErrors).forEach(([k, v]) => startFieldErrors[k] = v)

      try { await instance.setFieldErrors() }
      catch (error) { null }
      expect(startFieldErrors).not.toEqual(instance.state.fieldErrors)
    })

    it('throws exception if any field has an error', async () => {
      const { instance } = createApp().root.findByType(Contact)
      await expect(instance.setFieldErrors()).rejects.toThrow()
      instance.setState({ fieldValues: {
        email: 'test@email.com',
        name: 'Julian',
        subject: 'hi',
        message: 'message long enough so it passes the validation test'
      }})
      sleep(20)
      await expect(instance.setFieldErrors()).resolves.toBeFalsy()
    })
  })

  describe('#sendEmail', () => {
    beforeEach(() => {
      // avoid fetch action inside componentDidUpdate
      jest.spyOn(Contact.prototype, 'componentDidMount').mockReturnValue(null)
    })

    it('posts field values to correct endpoint', async () => {
      const mockFetchResp = { ok: true }
      const mockFieldValues = { one: 1, two: 'three' }
      const fetchArg1 = urlBuilder('/cimarron/email')
      const fetchArg2 = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockFieldValues),
      }

      const spy = jest.spyOn(global, 'fetch').mockResolvedValue(mockFetchResp)
      const { instance } = createApp().root.findByType(Contact)
      instance.setState({ fieldValues: mockFieldValues })
      await sleep(30)

      await expect(instance.sendEmail()).resolves.toEqual(mockFetchResp)
      expect(spy).toHaveBeenCalledWith(fetchArg1, fetchArg2)
    })

    it('handle exception thrown if there are fetch errors', async () => {
      const errorMsg = 'test error message'
      jest.spyOn(global, 'fetch').mockImplementation(() => { throw new Error(errorMsg) })
      const { instance } = createApp().root.findByType(Contact)

      await expect(instance.sendEmail()).rejects.toThrow(errorMsg)
      await sleep(30)
      expect(instance.state.emailStatus).toEqual('error')
      expect(instance.state.errorMessage).toEqual(errorMsg)
    })
  })

  describe('#checkSendEmailRespErrors', () => {
    beforeEach(() => {
      // avoid fetch action inside componentDidUpdate
      jest.spyOn(Contact.prototype, 'componentDidMount').mockReturnValue(null)
    })

    it('should return nothing if no errors', async () => {
      const mockResp = { ok: true }
      const { instance } = createApp().root.findByType(Contact)
      await expect(instance.checkSendEmailRespErrors(mockResp)).resolves.toBeFalsy()
    })

    it('handles exception if response status is 5xx', async () => {
      const errorMsg = 'test error message'
      const mockResp = { ok: false, status: 502, text: async () => errorMsg }
      const { instance } = createApp().root.findByType(Contact)
      await expect(instance.checkSendEmailRespErrors(mockResp)).rejects.toThrow('response error')
      expect(instance.state.emailStatus).toEqual('error')
      expect(instance.state.errorMessage).toEqual(errorMsg)
    })

    describe('handle 4xx exception', () => {
      test('missing csrf token', async () => {
        const mockJson = {
          error_type: 'ValidationError',
          error_payload: { csrf_token: 'test invalid csrf' }
        }
        const mockResp = { ok: false, status: 402, json: async () => mockJson }
        const { instance } = createApp().root.findByType(Contact)
        await expect(instance.checkSendEmailRespErrors(mockResp)).rejects.toThrow('response error')
        expect(instance.state.emailStatus).toEqual('spoof')
        expect(instance.state.errorMessage).toEqual('')
      })

      test('invalid field data', async () => {
        const mockJson = {
          error_type: 'ValidationError',
          error_payload: {
            email: 'test invalid email',
            name: 'test invalid name',
          }
        }
        const mockResp = { ok: false, status: 400, json: async () => mockJson }
        const { instance } = createApp().root.findByType(Contact)
        await expect(instance.checkSendEmailRespErrors(mockResp)).rejects.toThrow('response error')
        expect(instance.state.emailStatus).toEqual('invalid_data')
        expect(instance.state.fieldErrors).toEqual(mockJson.error_payload)
      })

      test('other error types', async () => {
        const mockJson = {
          error_type: 'UnforseenError',
          error_payload: 'unknown error message'
        }
        const mockResp = {
          ok: false,
          status: 400,
          text: async () => mockJson.error_payload,
          json: async () => mockJson,
        }
        const { instance } = createApp().root.findByType(Contact)
        await expect(instance.checkSendEmailRespErrors(mockResp)).rejects.toThrow('response error')
        expect(instance.state.emailStatus).toEqual('error')
        expect(instance.state.errorMessage).toEqual(mockJson.error_payload)
      })
    })
  })

  describe('#handleFormOnSubmit', () => {
    beforeEach(() => {
      // avoid fetch action inside componentDidUpdate
      jest.spyOn(Contact.prototype, 'componentDidMount').mockReturnValue(null)
      // render method nullifies mocked refs
      jest.spyOn(Contact.prototype, 'render').mockReturnValue(null)
    })

    it('prevents event default', async () => {
      const mockEvent = new Event('test event')
      const spy = jest.spyOn(mockEvent, 'preventDefault')
      const { instance } = createApp().root.findByType(Contact)
      instance.formRefs.submit.current = document.createElement('button')
      await instance.handleFormOnSubmit(mockEvent)
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('disables and re-enables submit button', async () => {
      const mockEvent = new Event('test event')
      const mockSubmitButton = document.createElement('button')
      const mockSetter = jest.spyOn(mockSubmitButton, 'disabled', 'set')
      const { instance } = createApp().root.findByType(Contact)
      instance.formRefs.submit.current = mockSubmitButton
      await instance.handleFormOnSubmit(mockEvent)
      expect(mockSetter.mock.calls).toEqual([[true], [false]])
    })

    it('marks form as submitted', async () => {
      const { instance } = createApp().root.findByType(Contact)
      const mockEvent = new Event('test event')
      instance.formRefs.submit.current = document.createElement('button')
      expect(instance.state.wasFormSubmitted).toBe(false)
      await instance.handleFormOnSubmit(mockEvent)
      await sleep(20)
      expect(instance.state.wasFormSubmitted).toBe(true)
    })

    it('calls #setFieldErrors', async () => {
      const { instance } = createApp().root.findByType(Contact)
      const mockEvent = new Event('test event')
      const mockFn = jest.spyOn(Contact.prototype, 'setFieldErrors').mockResolvedValue(null)
      instance.formRefs.submit.current = document.createElement('button')
      await instance.handleFormOnSubmit(mockEvent)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('calls #sendEmail', async () => {
      const { instance } = createApp().root.findByType(Contact)
      const mockEvent = new Event('test event')
      jest.spyOn(Contact.prototype, 'setFieldErrors').mockResolvedValue(null)
      const mockFn = jest.spyOn(Contact.prototype, 'sendEmail').mockResolvedValue(null)
      instance.formRefs.submit.current = document.createElement('button')
      await instance.handleFormOnSubmit(mockEvent)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('calls #checkSendEmailRespErrors', async () => {
      const { instance } = createApp().root.findByType(Contact)
      const mockEvent = new Event('test event')
      jest.spyOn(Contact.prototype, 'setFieldErrors').mockResolvedValue(null)
      jest.spyOn(Contact.prototype, 'sendEmail').mockResolvedValue(null)
      const mockFn = jest.spyOn(Contact.prototype, 'checkSendEmailRespErrors').mockResolvedValue(null)
      instance.formRefs.submit.current = document.createElement('button')
      await instance.handleFormOnSubmit(mockEvent)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('marks email as sent if all went well', async () => {
      const { instance } = createApp().root.findByType(Contact)
      const mockEvent = new Event('test event')
      jest.spyOn(Contact.prototype, 'setFieldErrors').mockResolvedValue(null)
      jest.spyOn(Contact.prototype, 'sendEmail').mockResolvedValue(null)
      jest.spyOn(Contact.prototype, 'checkSendEmailRespErrors').mockResolvedValue(null)
      instance.formRefs.submit.current = document.createElement('button')
      await instance.handleFormOnSubmit(mockEvent)
      await sleep(20)
      expect(instance.state.emailStatus).toEqual('sent')
    })

    it('catches error if any method throw an exception', async () => {
      const { instance } = createApp().root.findByType(Contact)
      const mockEvent = new Event('test event')
      jest.spyOn(Contact.prototype, 'setFieldErrors').mockRejectedValue('testing error')
      instance.formRefs.submit.current = document.createElement('button')
      await expect(instance.handleFormOnSubmit(mockEvent)).resolves.not.toThrow()
    })
  })

  describe('#getEmailFormBtn', () => {
    it('returns submit button for form', () => {
      const { instance } = createApp().root.findByType(Contact)
      const Button = instance.getEmailFormBtn()
      const wrapper = create(<MockApp><Button /></MockApp>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('integration tests', () => {
    describe('#componentDidUpdate', () => {
      it('calls #setCsrfToken', () => {
        const mockFn = jest.spyOn(Contact.prototype, 'setCsrfToken').mockResolvedValue(null)
        createApp()
        expect(mockFn).toHaveBeenCalledTimes(1)
      })
    })

    describe('#render', () => {
      it('does not render if CSRF token not present', async () => {
        jest.spyOn(Contact.prototype, 'setCsrfToken').mockResolvedValue(null)
        const wrapper = createApp()
        await sleep(30)
        expect(wrapper).toMatchSnapshot()
      })

      it('displays form when CSRF token is set', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
          ok: true,
          json: async () => ({ token: 'test_token' }),
        })
        const wrapper = createApp()
        await sleep(30)
        expect(wrapper).toMatchSnapshot()
      })

      xit('displays errors on fields upon submitting', async () => {
      })
    })
  })
})
