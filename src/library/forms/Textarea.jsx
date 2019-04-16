import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'


const NoOp = () => {}

const STYLES = {
  inputError: (props) => css`
    border: 2px solid ${props.colors.error};
  `
}

function Textarea({
  defaultValue,
  errorTxt,
  fwdRef,
  inputProps,
  labelTxt,
  name,
  onChange,
  rows,
  styles,
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
      <textarea
        ref={fwdRef}
        id={name}
        name={name}
        defaultValue={defaultValue}
        css={errorTxt && STYLES.inputError}
        onChange={onChange}
        rows={rows}
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

Textarea.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  errorTxt: PropTypes.string,
  fwdRef: PropTypes.object,
  inputProps: PropTypes.object,
  labelTxt: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.number,
  styles: PropTypes.object,
}

Textarea.defaultProps = {
  defaultValue: null,
  onChange: NoOp,
  styles: {},
  rows: 20,
}

export default Textarea
