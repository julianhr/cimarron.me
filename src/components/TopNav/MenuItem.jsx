import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'


const Root = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`

const StyledLink = styled(Link)`
    color: ${props => props.theme.colors.text};
    text-decoration: none;
    margin: 0 10px;
    padding: 0 6px 4px;
    border-bottom: 2px solid transparent;
    transition: border-bottom-color 75ms linear;

    :hover {
      border-bottom-color: #e10d75;
      transition-duration: 140ms;
    }
`

function MenuItem(props) {
  return (
    <Root>
      <StyledLink
        to={props.url}
      >
        {props.label}
      </StyledLink>
    </Root>
  )
}

MenuItem.propTypes = {
  url: PropTypes.string,
  label: PropTypes.string,
}

export default MenuItem
