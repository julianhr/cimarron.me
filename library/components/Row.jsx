/* @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from '@emotion/core'


const SPACING = [null, 8, 16, 24, 32, 40]
const ALIGN_ITEMS = [null, 'center']

const styles = {
  root: function(props) {
    const { alignItems } = props
    const padding = props.spacing ? props.spacing / 2 : null

    return {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems,
      padding,
      '& > .col': {
        padding,
      },
      ...props.style
    }
  }
}

function Row(props) {
  return (
    <div
      css={styles.root(props)}
    >
      {props.children}
    </div>
  )
}

Row.propTypes = {
  alignItems: PropTypes.oneOf(ALIGN_ITEMS),
  spacing: PropTypes.oneOf(SPACING),
  style: PropTypes.object,
}

Row.defaultProps = {
  alignItems: null,
  spacing: null,
  style: {},
}

export default Row
