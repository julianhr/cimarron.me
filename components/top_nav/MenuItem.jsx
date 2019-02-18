/* @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'

import { colors } from '../../library'


const Root = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`

const styles = {
  link: {
    color: `${colors.TEXT}`,
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
  }
}

function MenuItem(props) {
  return (
    <Root>
      <Link
        href={props.url}
      >
        <a css={styles.link}>{props.label}</a>
      </Link>
    </Root>
  )
}

MenuItem.propTypes = {
  url: PropTypes.string,
  label: PropTypes.string,
}

export default MenuItem
