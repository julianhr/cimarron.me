/* @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from '@emotion/core'

import queries from '../styles/responsive'

const ALIGN_ITEMS = [null, 'center']
const COLUMNS = [null, 1,2,3,4,5,6,7,8,9,10,11,12]
const MAX_COL = 12

function getWidth(columns) {
  const perc = Math.floor((columns / MAX_COL) * 100)
  return `calc(${perc}%)`
}

function getStyle(props) {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    width: getWidth(props.xs),
    alignItems: props.alignItems,
  }

  if (props.md) {
    style[queries.md] = {
      width: getWidth(props.md)
    }
  }
  if (props.xl) {
    style[queries.md] = {
      width: getWidth(props.lg)
    }
  }

  return style
}

function Col(props) {
  return (
    <div
      className='col'
      css={getStyle(props)}
    >
      {props.children}
    </div>
  )
}

Col.propTypes = {
  xs: PropTypes.oneOf(COLUMNS),
  md: PropTypes.oneOf(COLUMNS),
  lg: PropTypes.oneOf(COLUMNS),
  alignItems: PropTypes.oneOf(ALIGN_ITEMS)
}

Col.defaultProps = {
  xs: 12,
  md: null,
  lg: null,
  alignItems: null,
}

export default Col
