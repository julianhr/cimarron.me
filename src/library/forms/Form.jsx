import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'


const FormTag = styled.form`
  display: flex;
  flex-direction: column;

  div.field {
    margin-bottom: 15px;
  }

  label {
    padding: 0 10px 4px;
    width: 100%;
    display: flex;
    color: ${props => props.theme.colors.primary.dark};
    font-size: 1.1em;
  }

  input, textarea {
    width: 100%;
    margin-bottom: 2px;

    :focus {
      outline: none;
    }
  }

  input {
    padding: 10px 12px;
  }

  textarea {
    padding: 12px;
  }

  span {
    color: ${props => props.theme.colors.error};
    font-size: 14px;
    display: flex;
    height: 16px;
  }

  button[type=submit] {
    margin-top: 20px;
  }
`

function Form({ children, formStyle, onSubmit }) {
  return (
    <FormTag
      css={formStyle}
      method={'POST'}
      onSubmit={onSubmit}
      onKeyPress={handleFormOnKeyPress}
    >
      {children}
    </FormTag>
  )
}

export function handleFormOnKeyPress(event) {
  if (event.key !== 'Enter') { return null }

  // allow user to press Enter inside a textarea tag
  // insert a line break instead of submitting the form
  if (event.target.type === 'textarea') {
    event.stopPropagation()
  }
}

Form.propTypes = {
  formStyle: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
}

Form.defaultProps = {
  formStyle: {},
}

export default Form
