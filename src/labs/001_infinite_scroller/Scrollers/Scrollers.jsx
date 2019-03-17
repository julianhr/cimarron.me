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
  width: 100%;
  max-width: 600px;
  border: 2px solid #acacac;
  height: 100%;
  overflow: hidden;
`

function Scrollers({ recordsPerFetch, scrollerType }) {
  const fetchCards = async () => {
    const path = '/infinite-scroller'
    const query = { paragraphs: 1, entries: recordsPerFetch }
    const url = urlBuilder(path, query)
    const res = await fetch(url)

    try {
      if (res.ok) {
        const json = await res.json()
        return json
      } else {
        throw Error('There was an error with the fetch request.')
      }
    } catch (error) {
      console.log('testing error', error)
      throw error
    }
  }

  const renderChildren = () => {
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
        {renderChildren()}
      </Contour>
    </Root>
  )
}

Scrollers.propTypes = {
  entryCount: PropTypes.number,
  recordsPerFetch: PropTypes.number,
  scrollerType: PropTypes.string,
}

const mapStateToProps = ({ recordsPerFetch, scrollerType, entryCount }) => (
  { recordsPerFetch, scrollerType, entryCount }
)

export default connect(mapStateToProps)(Scrollers)
