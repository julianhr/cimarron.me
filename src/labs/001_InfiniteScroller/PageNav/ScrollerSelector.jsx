import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setScrollerType } from '../actions/rootActions'
import Selector from './Selector'


export const SCROLLERS = [
  { intersectionObserver: 'Intersection Observer with Sentinel' },
  { containerScrollHeights: 'Container scrollHeight and scrollTop' },
  { sentinelClientRect: 'Sentinel bounding client rectangle' },
]

export function ScrollerSelector({ scrollerType, setScrollerType }) {
  return (
    <Selector
      label='Scroller Re-Fetch Method:'
      keys={SCROLLERS.map(scroller => Object.keys(scroller))}
      titles={SCROLLERS.map(scroller => Object.values(scroller))}
      selected={scrollerType}
      onChange={setScrollerType}
    />
  )
}

ScrollerSelector.propTypes = {
  setScrollerType: PropTypes.func.isRequired,
  scrollerType: PropTypes.string.isRequired,
}

const mapStateToProps = ({ scrollerType }) => ({ scrollerType })
const mapDispatchToProps = { setScrollerType }

export default connect(mapStateToProps, mapDispatchToProps)(ScrollerSelector)
