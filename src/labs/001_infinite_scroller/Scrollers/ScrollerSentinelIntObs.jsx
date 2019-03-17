import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { connect } from 'react-redux'

import { setIsFetching, setEntryCount } from '../actions/rootActions'
import Card from '../Card'
import FetchStatus from './FetchStatus'


const Root = styled.div`
  height: 100%;
  padding: 10px 10px 0;
  background: #e8e8e8;
  overflow-y: auto;
`

class ScrollerSentinelIntObs extends React.PureComponent {
  static propTypes = {
    cardFetcher: PropTypes.func,
    isFetching: PropTypes.bool,
    sentinelPosition: PropTypes.number,
    setEntryCount: PropTypes.func,
    setIsFetching: PropTypes.func,
  }

  state = {
    isSupported: true,
    cards: [],
    fetch: {
      status: 'loading',
      error: null,
    },
  }

  refSentinel = React.createRef()
  observer = null

  componentDidMount() {
    if (this.isSupported()) {
      this.observer = new IntersectionObserver(this.handleIntObs())
      this.setState({ isSupported: true })
      this.fetchCards()
    } else {
      this.setState({ isSupported: false, })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isSupported, cards } = this.state

    if (isSupported && cards.length > prevState.cards.length) {
      this.observer.observe(this.refSentinel.current)
    }
  }

  isSupported() {
    return 'IntersectionObserver' in window
  }

  async fetchCards() {
    const { cardFetcher, setIsFetching } = this.props
    let data
    setIsFetching(true)

    try {
      data = await cardFetcher(this)
      if (!data) { return }
    } catch (error) {
      this.setState({ fetch: { status: 'error', error: error.toString() } })
      return
    }

    const { cards: currCards } = this.state
    const cards = [...currCards]

    if (this.refSentinel.current) {
      this.observer.unobserve(this.refSentinel.current)
    }

    this.appendNewCards(cards, data, currCards.length)
    this.props.setEntryCount(cards.length)
    this.setState({ cards, fetch: null })
    setIsFetching(false)
  }

  appendNewCards(cards, data, lastKey) {
    const { sentinelPosition } = this.props

    data.forEach(({ title, image_url: imgUrl, description }, i) => {
      const position = lastKey + i + 1
      const props = { imgUrl, title, description, position }
      let CardComponent = Card

      if (i+1 === sentinelPosition) {
        CardComponent = React.forwardRef((props, ref) => <Card forwardedRef={ref} {...props} />)
        props.forwardedRef = this.refSentinel
      }

      cards.push(<CardComponent key={lastKey+i} {...props} />)
    })
  }

  handleIntObs() {
    const parent = this

    return (entries) => {
      entries.forEach(entry => {
        const { isFetching } = parent.props
        const { cards } = parent.state

        if (entry.isIntersecting && !isFetching && cards.length < 200) {
          parent.fetchCards()
        }
      })
    }
  }

  renderCardResult() {
    const fetchStatus = (this.state.fetch || {}).status

    if (!this.state.isSupported) {
      return (
        <FetchStatus>
          <>
            <p>This browser doesn't support the Intersection Observer. </p>
            <a
              href='https://caniuse.com/#feat=intersectionobserver'
              target='_blank'
              rel='noopener noreferrer'
            >
              Check compatibility
            </a> 
          </>
        </FetchStatus>
      )
    } else if (fetchStatus === 'loading') {
      return <FetchStatus>Loading...</FetchStatus>
    } else if (fetchStatus === 'error' && this.state.cards.length === 0) {
      return <FetchStatus>{this.state.fetch.error.toString()}</FetchStatus>
    } else {
      return this.state.cards
    }
  }

  render() {
    return (
      <Root>
        {this.renderCardResult()}
      </Root>
    )
  }
}

const mapStateToProps = ({ sentinelPosition, isFetching }) => (
  { sentinelPosition, isFetching }
)

const mapDispatchToProps = { setIsFetching, setEntryCount }

export default connect(mapStateToProps, mapDispatchToProps)(ScrollerSentinelIntObs)
