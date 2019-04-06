import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { connect } from 'react-redux'
import { throttle } from 'lodash-es'

import { setIsFetching, setEntryCount } from '../actions/rootActions'
import Card from '../Card'
import FetchStatus from './FetchStatus'


const Root = styled.div`
  height: 100%;
  padding: 10px 10px 0;
  background: #e8e8e8;
  overflow-y: scroll;
`

export class ScrollerContainerHeights extends React.PureComponent {
  static propTypes = {
    cardFetcher: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    setEntryCount: PropTypes.func.isRequired,
    setIsFetching: PropTypes.func.isRequired,
  }

  state = {
    cards: [],
    fetch: {
      status: 'loading',
      error: null,
    },
  }

  refRoot = React.createRef()

  componentDidMount() {
    this.props.setEntryCount(0)
    this.getNewCards()
  }
  
  canFetchCards(containerElement) {
    const { scrollHeight, scrollTop, clientHeight } = containerElement
    const buffer = 500
    return scrollHeight - scrollTop < clientHeight + buffer
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

  setNewCards(data) {
    const { length: lastKey } = this.state.cards
    const cards = [...this.state.cards]

    data.forEach((datum, i) => {
      const card = this.getCard(datum, i, lastKey)
      cards.push(card)
    })

    this.setState({ cards, fetch: null })
  }

  getCard(datum, i, lastKey) {
    const { title, image_url: imgUrl, description } = datum
    const position = lastKey + i + 1
    const props = { imgUrl, title, description, position }
    return <Card key={lastKey + i} {...props} />
  }

  handleOnScroll() {
    const { isFetching } = this.props
    const { cards } = this.state

    if (!isFetching && this.canFetchCards(this.refRoot.current) && cards.length < 200) {
      this.getNewCards()
    }
  }

  renderCardResult() {
    const fetchStatus = (this.state.fetch || {}).status

    if (fetchStatus === 'loading') {
      return <FetchStatus>Loading...</FetchStatus>
    } else if (fetchStatus === 'error') {
      return <FetchStatus>{this.state.fetch.error.toString()}</FetchStatus>
    } else {
      return this.state.cards
    }
  }

  render() {
    return (
      <Root
        ref={this.refRoot}
        onScroll={throttle(this.handleOnScroll, 150, { leading: false }).bind(this)}
      >
        {this.renderCardResult()}
      </Root>
    )
  }
}

const mapStateToProps = ({ isFetching }) => ({ isFetching })
const mapDispatchToProps = { setIsFetching, setEntryCount }

export default connect(mapStateToProps, mapDispatchToProps)(ScrollerContainerHeights)
