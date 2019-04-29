import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'


const NoOp = () => {}

const Btn = styled.button`
  border: 2px solid ${props => props.theme.colors.primary.dark};
  border-radius: 5px;
  background: transparent;
  padding: 4px 16px;
  color: ${props => props.theme.colors.primary.dark};
  font-size: 1.3em;
  height: 44px;
  min-width: 140px;

  :hover {
    cursor: pointer;
  }

  :disabled {
    border: 2px solid ${props => props.theme.colors.primary.dim};
    color: ${props => props.theme.colors.primary.dim};
  }
`

function Button({ children, type, btnStyle, onClick, fwdRef }) {
  return (
    <Btn
      ref={fwdRef}
      type={type}
      onClick={onClick}
      css={btnStyle}
    >
      {children}
    </Btn>
  )
}

Button.propTypes = {
  btnStyle: PropTypes.object,
  children: PropTypes.string.isRequired,
  fwdRef: PropTypes.object,
  onClick: PropTypes.func,
  type: PropTypes.string,
}

Button.defaultProps = {
  btnStyle: {},
  onClick: NoOp,
  type: 'button',
}

export default Button
