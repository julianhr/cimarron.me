import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { connect } from 'react-redux'

import { setScrollerType } from '../actions/rootActions'
import Selector from './Selector'


function ScrollerSelector({ scrollerType, setScrollerType }) {
  return (
    <Selector
      label='Scroller Re-Fetch Method:'
      keys={[
        'intersectionObserver',
        'containerScrollHeights',
        'sentinelClientRect',
      ]}
      values={[
        'Intersection Observer with Sentinel',
        'Container scrollHeight and scrollTop',
        'Sentinel bounding client rectangle',
      ]}
      selected={scrollerType}
      onChange={setScrollerType}
    />
  )
}

ScrollerSelector.propTypes = {
  setScrollerType: PropTypes.func,
  scrollerType: PropTypes.string,
}

const mapStateToProps = ({ scrollerType }) => ({ scrollerType })
const mapDispatchToProps = { setScrollerType }

export default connect(mapStateToProps, mapDispatchToProps)(ScrollerSelector)
