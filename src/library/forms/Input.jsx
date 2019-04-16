import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'


const NoOp = () => {}

const STYLES = {
  inputError: (props) => css`
    border: 2px solid ${props.colors.error};
  `
}

function Input({
  defaultValue,
  errorTxt,
  fwdRef,
  inputProps,
  labelTxt,
  name,
  onChange,
  styles,
  type,
}) {
  return (
    <div
      className='field'
      css={styles.root}
    >
      {labelTxt &&
        <label
          htmlFor={name}
          css={styles.label}
        >
          {labelTxt}
        </label>
      }
      <input
        ref={fwdRef}
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        css={errorTxt && STYLES.inputError}
        onChange={onChange}
        {...inputProps}
      />
      <span
        css={styles.span}
      >
        {errorTxt}
      </span>
    </div>
  )
}

Input.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  errorTxt: PropTypes.string,
  fwdRef: PropTypes.object,
  inputProps: PropTypes.object,
  labelTxt: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  styles: PropTypes.object,
  type: PropTypes.string,
}

Input.defaultProps = {
  defaultValue: null,
  onChange: NoOp,
  styles: {},
  type: 'text',
}

export default Input
