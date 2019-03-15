import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { connect } from 'react-redux'

import { urlBuilder } from '~/utils'
import ScrollerStatus from './ScrollerStatus'
import ScrollerSentinelIntObs from './ScrollerSentinelIntObs'
import ScrollerContainerHeights from './ScrollerContainerHeights'
import ScrollerSentinelClientRect from './ScrollerSentinelClientRect'


const Root = styled.section`
  width: 100%;
  height: 80vh;
  min-height: 400px;
  max-height: 700px;
  display: flex;
  flex-direction: column;
  padding: 0 30px 20px;
  align-items: center;

  ${props => props.theme.queries.from('md')} {
    max-height: 800px;
  }
`

const Contour = styled.div`
  max-width: 600px;
  border: 2px solid #acacac;
  height: 100%;
  overflow: hidden;
`

function Scrollers({ scrollerType, recordsPerFetch }) {
  const fetchCards = () => {
    const path = '/infinite-scroller'
    const query = { paragraphs: 1, entries: recordsPerFetch }
    const url = urlBuilder(path, query)

    return fetch(url)
      .then(res => {
        if (res.ok) { return res.json() }
        else { throw Error('Fetch error') }
      })
      .catch(error => {
        console.error('Fetch error:', error)
      })
  }

  const renderScroller = () => {
    switch (scrollerType) {
      case 'intersectionObserver':
        return <ScrollerSentinelIntObs cardFetcher={fetchCards} />
      case 'containerScrollHeights':
        return <ScrollerContainerHeights cardFetcher={fetchCards} />
      case 'sentinelClientRect':
        return <ScrollerSentinelClientRect cardFetcher={fetchCards} />
    }
  }

  return (
    <Root>
      <ScrollerStatus />
      <Contour>
        {renderScroller()}
      </Contour>
    </Root>
  )
}

Scrollers.propTypes = {
  scrollerType: PropTypes.string,
  recordsPerFetch: PropTypes.number,
}

const mapStateToProps = ({ recordsPerFetch, scrollerType }) => (
  { scrollerType, recordsPerFetch }
)

export default connect(mapStateToProps)(Scrollers)
