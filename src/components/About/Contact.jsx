import React from 'react'
import styled from '@emotion/styled'
import { debounce } from 'lodash-es'

import { urlBuilder } from '~/utils'
import EmailForm from './EmailForm'
import EmailSent from './EmailSent'
import SpoofEmail from './SpoofEmail'
import Button from '~/library/Button'
import fieldErrorFuncs from './fieldErrorFuncs'


const H3 = styled.h3`
  margin-top: 100px;
  align-self: center;
  color: ${props => props.theme.colors.text};
`

const ErrorMessage = styled.div`
  align-self: center;
  color: ${props => props.theme.colors.error};
  max-width: 560px;
`

class Contact extends React.PureComponent {
  constructor() {
    super()
    this.handleFieldOnChange = this.handleFieldOnChange.bind(this)
    this.handleFormOnSubmit = this.handleFormOnSubmit.bind(this)
    this.debFieldOnChange = this.debFieldOnChange.bind(this)
  }

  state = {
    wasFormSubmitted: false,
    emailStatus: 'draft',
    fieldValues: {},
    fieldErrors: {},
    errorMessage: '',
  }

  formRefs = {
    // form
    submit: React.createRef(),
    // fields
    email: React.createRef(),
    name: React.createRef(),
    subject: React.createRef(),
    message: React.createRef(),
  }

  componentDidMount() {
    this.setCsrfToken()
  }

  handleFieldOnChange({ target: { name, value } }) {
    this.debFieldOnChange.call(this, name, value)
  }

  debFieldOnChange = debounce((name, value) => {
    const { fieldValues, fieldErrors, wasFormSubmitted }  = this.state
    const nextState = { fieldValues: { ...fieldValues, [name]: value } }

    if (wasFormSubmitted) {
      const fieldError = fieldErrorFuncs[name].call(this, value)

      if (fieldError) {
        nextState.fieldErrors = { ...fieldErrors, [name]: fieldError }
      } else {
        if (fieldErrors[name]) {
          const nextFieldErrors = {...fieldErrors}
          delete nextFieldErrors[name]
          nextState.fieldErrors = nextFieldErrors
        }
      }
    }

    this.setState(nextState, () => {
      wasFormSubmitted && this.formRefs[name].current.focus()
    })
  }, 150)

  async setCsrfToken() {
    const urlCsrfToken = urlBuilder('/cimarron/generate-token')
    const res = await fetch(urlCsrfToken)

    if (res.ok) {
      const json = await res.json()
      this.setState({ fieldValues: { ...this.state.fieldValues, csrf_token: json.token } })
    }
  }

  async handleFormOnSubmit(event) {
    event.preventDefault()
    this.formRefs.submit.current.disabled = true

    if (!this.state.wasFormSubmitted) {
      this.setState({ wasFormSubmitted: true })
    }

    try {
      await this.setFieldErrors()
      const resp = await this.sendEmail()
      await this.checkSendEmailRespErrors(resp)
      this.setState({ emailStatus: 'sent' })
    } catch (error) {
      null
    }

    if (this.formRefs.submit.current) {
      this.formRefs.submit.current.disabled = false
    }
  }

  async setFieldErrors() {
    const fieldErrors = {}

    for (let [name, fn] of Object.entries(fieldErrorFuncs)) {
      const error = fn(this.state.fieldValues[name])
      if (error) { fieldErrors[name] = error }
    }

    this.setState({ fieldErrors })
    const hasErrors = Object.keys(fieldErrors).length > 0
    if (hasErrors) { throw new Error('fields have errors') }
  }

  async sendEmail() {
    try {
      const url = urlBuilder('/cimarron/email')
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state.fieldValues),
      })
      return resp
    } catch (error) {
      this.setState({ emailStatus: 'error', errorMessage: error.message })
      throw error
    }
  }

  async checkSendEmailRespErrors(resp) {
    if (resp.ok) { return }

    let nextState

    if (('' + resp.status)[0] === '5') {
      // 5xx errors
      const errorText = await resp.text()
      nextState = { emailStatus: 'error', errorMessage: errorText }
    } else {
      // 4xx errors
      const json = await resp.json()

      if (json.error_type === 'ValidationError' && json.error_payload.csrf_token) {
        nextState = { emailStatus: 'spoof', errorMessage: '' }
      } else if (json.error_type === 'ValidationError') {
        nextState = { emailStatus: 'invalid_data', fieldErrors: json.error_payload }
      } else {
        const errorText = await resp.text()
        nextState = { emailStatus: 'error', errorMessage: errorText }
      }
    }

    this.setState(nextState)
    throw new Error('response error')
  }

  getEmailFormBtn = () => (
    () => (
      <Button
        fwdRef={this.formRefs.submit}
        type={'submit'}
        btnStyle={{ alignSelf: 'flex-end'}}
      >
        Send
      </Button>
    )
  )

  renderErrorFlash() {
    if (this.state.emailStatus !== 'error') { return }

    return (
      <ErrorMessage>
        <p>
          There was an error sending this email:
          <br />
          {this.state.errorMessage}
        </p>
      </ErrorMessage>
    )
  }

  render() {
    if (!this.state.fieldValues.csrf_token) {
      return null
    }

    switch (this.state.emailStatus) {
      case 'draft':
      case 'error':
      case 'invalid_data':
        return (
          <>
            <H3>Contact</H3>
            <EmailForm
              defaultValues={this.state.fieldValues}
              fieldErrors={this.state.fieldErrors}
              formRefs={this.formRefs}
              onFieldChange={this.handleFieldOnChange}
              onSubmit={this.handleFormOnSubmit}
              SubmitButton={this.getEmailFormBtn()}
            />
            {this.renderErrorFlash()}
          </>
        )
      case 'sent':
        return <EmailSent />
      case 'spoof':
        return <SpoofEmail />
    }
  }
}

export default Contact
