import emailValidator from 'email-validator'

export const ERRORS = {
  required: () => 'This field is required',
  length: (min, max) => `This field must be between ${min} and ${max} characters`,
  email: () => 'This email address is invalid',
}


const fieldErrorFuncs = {
  email: (value) => {
    if (!value) {
      return ERRORS.required()
    } else if (value.length < 8 || value.length > 50) {
      return ERRORS.length(8, 50)
    } else if (!emailValidator.validate(value)) {
      return ERRORS.email()
    }
  },
  name: (value) => {
    if (!value) {
      return ERRORS.required()
    } else if (value.length < 2 || value.length > 50) {
      return ERRORS.length(2, 50)
    }
  },
  subject: (value) => {
    if (!value) {
      return ERRORS.required()
    } else if (value.length < 2 || value.length > 120) {
      return ERRORS.length(2, 120)
    }
  },
  message: (value) => {
    if (!value) {
      return ERRORS.required()
    } else if (value.length < 50 || value.length > 10000) {
      return ERRORS.length(50, '10,000')
    }
  },
}

export default fieldErrorFuncs
