import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import Form from '~/library/forms/Form'
import Input from '~/library/forms/Input'
import Textarea from '~/library/forms/Textarea'


function EmailForm({
  SubmitButton,
  defaultValues,
  fieldErrors,
  formRefs,
  onFieldChange,
  onSubmit,
}) {
  return (
    <Form
      formStyle={css`
        align-self: center;
        width: 80%;
        max-width: 560px;
      `}
      onSubmit={onSubmit}
    >
      <Input
        fwdRef={formRefs.email}
        defaultValue={defaultValues.email}
        errorTxt={fieldErrors.email}
        labelTxt='Your Email'
        name='email'
        type='email'
        onChange={onFieldChange}
      />
      <Input
        fwdRef={formRefs.name}
        defaultValue={defaultValues.name}
        errorTxt={fieldErrors.name}
        labelTxt='Your Name'
        name='name'
        onChange={onFieldChange}
      />
      <Input
        fwdRef={formRefs.subject}
        defaultValue={defaultValues.subject}
        errorTxt={fieldErrors.subject}
        labelTxt='Subject'
        name='subject'
        onChange={onFieldChange}
      />
      <Textarea
        fwdRef={formRefs.message}
        defaultValue={defaultValues.message}
        errorTxt={fieldErrors.message}
        labelTxt='Message'
        name='message'
        onChange={onFieldChange}
      />
      <SubmitButton />
    </Form>
  )
}

EmailForm.propTypes = {
  defaultValues: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  formRefs: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  SubmitButton: PropTypes.func.isRequired,
}

export default EmailForm
