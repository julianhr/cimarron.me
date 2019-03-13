import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'


const Root = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`

const styles = {
  link: (theme) => ({
    color: `${theme.colors.text}`,
    textDecoration: 'none',
    margin: '0 10px',
    padding: '0 6px 4px',
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderBottomColor: 'transparent',
    ':hover': {
      borderBottomColor: '#e10d75',
      transitionDuration: '140ms',
    },
    transitionProperty: 'border-bottom-color',
    transitionDuration: '75ms',
    transitionTimingFunction: 'linear',
  })
}

function MenuItem(props) {
  return (
    <Root>
      <Link
        css={theme => styles.link(theme)}
        to={props.url}
      >
        {props.label}
      </Link>
    </Root>
  )
}

MenuItem.propTypes = {
  url: PropTypes.string,
  label: PropTypes.string,
}

export default MenuItem
