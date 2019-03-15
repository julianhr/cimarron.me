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
  overflow-y: scroll;
`

class ScrollerSentinelClientRect extends React.PureComponent {
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

  refRoot = React.createRef()
  refSentinel = React.createRef()

  componentDidMount() {
    this.fetchCards()
  }

  fetchCards() {
    const { cardFetcher } = this.props

    cardFetcher()
      .then(data => {
        const { cards: currCards } = this.state
        const cards = [...currCards]

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

  handleOnScroll = (event) => {
    const { isFetching } = this.props
    const { cards } = this.state
    const { top: sentinelTop } = this.refSentinel.current.getBoundingClientRect()
    const { clientHeight: rootClientHeight } = this.refRoot.current
    const isSentinelVisible = sentinelTop <= rootClientHeight

    if (!isFetching && isSentinelVisible && cards.length < 200) {
      this.props.setIsFetching(true)
      this.fetchCards()
    }
  }

  render() {
    return (
      <Root
        ref={this.refRoot}
        onScroll={this.handleOnScroll}
      >
        {this.state.cards}
      </Root>
    )
  }
}

const mapStateToProps = ({ sentinelPosition, isFetching }) => (
  { sentinelPosition, isFetching }
)

const mapDispatchToProps = { setEntryCount, setIsFetching }

export default connect(mapStateToProps, mapDispatchToProps)(ScrollerSentinelClientRect)
