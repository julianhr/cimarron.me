import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { connect } from 'react-redux'

import Card from '../Card'
import { setEntryCount, setIsFetching } from '../actions/rootActions'


const Root = styled.div`
  height: 100%;
  padding: 10px 10px 0;
  background: #e8e8e8;
  overflow-y: auto;
`

const Loading = styled.div`
  background: #eee;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  padding: 40px;
`

class ScrollerSentinelIntObs extends React.PureComponent {
  static propTypes = {
    cardFetcher: PropTypes.func,
    isFetching: PropTypes.bool,
    sentinelPosition: PropTypes.number,
    entryCount: PropTypes.number,
    setEntryCount: PropTypes.func,
    setIsFetching: PropTypes.func,
  }

  state = {
    isSupported: false,
    cards: [],
    loading: {
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

  fetchCards() {
    const { cardFetcher } = this.props

    cardFetcher()
      .then(data => {
        const { cards: currCards } = this.state
        const cards = [...currCards]

        if (this.refSentinel.current) {
          this.observer.unobserve(this.refSentinel.current)
        }

        this.appendNewCards(cards, data, currCards.length)
        this.setState({ cards, loading: { status: 'success', error: null } })
        this.props.setEntryCount(cards.length)
        this.props.setIsFetching(false)
      })
      .catch(error => {
        this.setState({ loading: { status: 'error', error: error.toString() } })
        this.props.setIsFetching(false)
        console.error('Fetch error:', error)
      })
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

      cards.push( <CardComponent key={lastKey+i} {...props} /> )
    })
  }

  handleIntObs() {
    const parent = this

    return (entries) => {
      entries.forEach(entry => {
        const { isFetching } = parent.props
        const { cards } = parent.state

        if (entry.isIntersecting && !isFetching && cards.length < 200) {
          parent.props.setIsFetching(true)
          parent.fetchCards()
        }
      })
    }
  }

  renderLoadingMsg() {
    if (!this.state.isSupported) {
      return (
        <div>
          <p>This browser doesn't support the Intersection Observer. </p>
          <a
            href='https://caniuse.com/#feat=intersectionobserver'
            target='_blank'
            rel='noopener noreferrer'
          >
            Check compatibility
          </a> 
        </div>
      )
    }

    switch(this.state.loading.status) {
      case 'loading':
        return 'Loading...'
      case 'error':
        return this.state.loading.error
    }
  }

  renderCardResult() {
    if (this.state.cards.length === 0) {
      return (
        <Loading>
          {this.renderLoadingMsg()}
        </Loading>
      )
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

const mapStateToProps = ({ sentinelPosition, isFetching, entryCount }) => (
  { sentinelPosition, isFetching, entryCount }
)

const mapDispatchToProps = { setEntryCount, setIsFetching }

export default connect(mapStateToProps, mapDispatchToProps)(ScrollerSentinelIntObs)
