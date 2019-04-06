import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'


const Message = styled.div`
  background: #eee;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  padding: 40px;
`

function FetchStatus({ children }) {
  return (
    <Message>
      <div>
        {children}
      </div>
    </Message>
  )
}

FetchStatus.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
}

export default FetchStatus
