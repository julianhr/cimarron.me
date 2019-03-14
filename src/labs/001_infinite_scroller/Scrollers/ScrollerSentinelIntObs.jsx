import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { connect } from 'react-redux'

import Card from '../Card'
import { setEntryCount, setIsFetching } from '../actions/rootActions'


const Root = styled.div`
  height: 80vh;
  padding: 10px 10px 0;
  background: #e8e8e8;
  overflow-y: scroll;
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
    cards: []
  }

  refSentinel = React.createRef()
  observer = new IntersectionObserver(this.handleIntObs())

  componentDidMount() {
    this.fetchCards()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.cards.length > prevState.cards.length) {
      this.observer.observe(this.refSentinel.current)
    }
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
        this.setState({ cards })
        this.props.setEntryCount(cards.length)
        this.props.setIsFetching(false)
      })
      .catch(error => {
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

  render() {
    return (
      <Root>
        {this.state.cards}
      </Root>
    )
  }
}

const mapStateToProps = ({ sentinelPosition, isFetching }) => (
  { sentinelPosition, isFetching }
)

const mapDispatchToProps = { setEntryCount, setIsFetching }

export default connect(mapStateToProps, mapDispatchToProps)(ScrollerSentinelIntObs)
