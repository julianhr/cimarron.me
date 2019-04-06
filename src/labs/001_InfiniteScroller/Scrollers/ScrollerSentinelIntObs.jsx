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

export class ScrollerSentinelIntObs extends React.PureComponent {
  static propTypes = {
    cardFetcher: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    sentinelPosition: PropTypes.number.isRequired,
    setEntryCount: PropTypes.func.isRequired,
    setIsFetching: PropTypes.func.isRequired,
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
    this.props.setEntryCount(0)

    if (this.isSupported()) {
      this.observer = new IntersectionObserver(this.handleIntObs())
      this.getNewCards()
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
    // Boolean check needed for Node and Jest by extension
    return 'IntersectionObserver' in window && Boolean(IntersectionObserver)
  }

  async getNewCards() {
    const { cardFetcher, setIsFetching, setEntryCount } = this.props

    try {
      setIsFetching(true)
      const data = await cardFetcher(this)
      this.setNewCards(data)
      setEntryCount(this.state.cards.length)
    } catch (error) {
      this.setState({ fetch: { status: 'error', error: error.toString() } })
    }

    setIsFetching(false)
  }

  getCard(datum, i, sentinelPosition, lastKey) {
    const { title, image_url: imgUrl, description } = datum
    const position = lastKey + i + 1
    const props = { imgUrl, title, description, position }
    let CardElement = Card

    if (i + 1 === sentinelPosition) {
      CardElement = React.forwardRef((props, ref) => <Card forwardedRef={ref} {...props} />)
      props.forwardedRef = this.refSentinel
    }

    return <CardElement key={lastKey + i} {...props} />
  }

  setNewCards(data) {
    const { length: lastKey } = this.state.cards
    const { sentinelPosition } = this.props
    const cards = [...this.state.cards]

    // a new sentinel will be set, remove the previous one
    if (this.refSentinel.current) {
      this.observer.unobserve(this.refSentinel.current)
    }

    data.forEach((datum, i) => {
      const card = this.getCard(datum, i, sentinelPosition, lastKey)
      cards.push(card)
    })

    this.setState({ cards, fetch: null })
  }

  handleIntObs() {
    const parent = this

    return (entries) => {
      entries.forEach(entry => {
        const { isFetching } = parent.props
        const { cards } = parent.state

        if (entry.isIntersecting && !isFetching && cards.length < 200) {
          parent.getNewCards()
        }
      })
    }
  }

  renderResult() {
    const fetchStatus = (this.state.fetch || {}).status

    if (!this.state.isSupported) {
      return (
        <FetchStatus>
          <>
            <p>This browser doesn't support the Intersection Observer.</p>
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
        {this.renderResult()}
      </Root>
    )
  }
}

const mapStateToProps = ({ sentinelPosition, isFetching }) => (
  { sentinelPosition, isFetching }
)

const mapDispatchToProps = { setIsFetching, setEntryCount }

export default connect(mapStateToProps, mapDispatchToProps)(ScrollerSentinelIntObs)
