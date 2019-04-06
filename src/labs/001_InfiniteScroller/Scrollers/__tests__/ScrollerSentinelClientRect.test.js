import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { create } from 'react-test-renderer'

import { ScrollerSentinelClientRect } from '../ScrollerSentinelClientRect'


describe('ScrollerSentinelClientRect', () => {
  function fakeDiv(scrollHeight, scrollTop, clientHeight) {
    return { scrollHeight, scrollTop, clientHeight, }
  }

  const testProps = {
    cardFetcher: async () => ([]),
    isFetching: false,
    sentinelPosition: 5,
    setEntryCount: () => {},
    setIsFetching: () => {},
  }

  describe('props', () => {
    test('cardFetcher is required', () => {
      const props = {...testProps}
      delete props.cardFetcher
      expect(() => render(<ScrollerSentinelClientRect {...props} />)).toThrow()
    })

    test('isFetching is required', () => {
      const props = {...testProps}
      delete props.isFetching
      expect(() => render(<ScrollerSentinelClientRect {...props} />)).toThrow()
    })

    test('sentinelPosition is required', () => {
      const props = {...testProps}
      delete props.sentinelPosition
      expect(() => render(<ScrollerSentinelClientRect {...props} />)).toThrow()
    })

    test('setEntryCount is required', () => {
      const props = {...testProps}
      delete props.setEntryCount
      expect(() => render(<ScrollerSentinelClientRect {...props} />)).toThrow()
    })

    test('setIsFetching is required', () => {
      const props = {...testProps}
      delete props.setIsFetching
      expect(() => render(<ScrollerSentinelClientRect {...props} />)).toThrow()
    })
  })

  describe('#getCard', () => {
    const testDatum = {
      image_url: 'http://image.com',
      title: 'test title',
      description: ['sentence one', 'sentence two'],
      position: 4,
    }

    it('returns a non-sentinel Card element if datum index != sentinel index', () => {
      const wrapper = create(<ScrollerSentinelClientRect {...testProps} />)
      const instance = wrapper.getInstance()
      const article = document.createElement('article')
      const i = 2, sentinelPosition = 4, lastKey = 10

      instance.refSentinel = article
      expect(instance.getCard(testDatum, i, sentinelPosition, lastKey)).toMatchSnapshot()
    })

    it('returns a sentinel Card element if datum index == sentinel index', () => {
      const wrapper = create(<ScrollerSentinelClientRect {...testProps} />)
      const instance = wrapper.getInstance()
      const article = document.createElement('article')
      const i = 2, sentinelPosition = 3, lastKey = 10

      instance.refSentinel = article
      expect(instance.getCard(testDatum, i, sentinelPosition, lastKey)).toMatchSnapshot()
    })
  })

  describe('#setNewCards', () => {
    it('appends new cards to the current ones', () => {
      // setup env
      jest.spyOn(ScrollerSentinelClientRect.prototype, 'getCard').mockImplementation(arg => arg)
      jest.spyOn(ScrollerSentinelClientRect.prototype, 'getNewCards').mockReturnValue()
      const spySetState = jest.spyOn(ScrollerSentinelClientRect.prototype, 'setState')
      const testData1 = ['card 1', 'card 2']
      const testData2 = ['card 3', 'card 4']
      // render
      const wrapper = create(<ScrollerSentinelClientRect {...testProps} />)
      const instance = wrapper.getInstance()
      // test with no data
      instance.setState({ fetch: null })
      expect(wrapper).toMatchSnapshot('no data')
      // test on data set 1
      instance.setNewCards(testData1)
      expect(spySetState).toBeCalledWith({ cards: testData1, fetch: null })
      expect(wrapper).toMatchSnapshot('data 1')
      // test on data set 2
      instance.setNewCards(testData2)
      expect(spySetState).toBeCalledWith({ cards: [...testData1, ...testData2], fetch: null })
      expect(wrapper).toMatchSnapshot('data 2')
    })
  })

  describe('#getNewCards', () => {
    let mockSetIsFetching, mockCardFetcher, mockSetNewCards, mockSetState, mockSetEntryCount
    let testCards = ['card1', 'card2', 'card3']

    beforeEach(() => {
      mockSetIsFetching = jest.spyOn(testProps, 'setIsFetching')
      mockSetEntryCount = jest.spyOn(testProps, 'setEntryCount')
      mockCardFetcher = jest.spyOn(testProps, 'cardFetcher').mockImplementation(() => Promise.resolve(testCards))
      mockSetNewCards = jest.spyOn(ScrollerSentinelClientRect.prototype, 'setNewCards').mockReturnValue(null)
      mockSetState = jest.spyOn(ScrollerSentinelClientRect.prototype, 'setState')
      jest.spyOn(ScrollerSentinelClientRect.prototype, 'componentDidMount').mockReturnValue(null)
    })

    it('is async', async () => {
      const wrapper = create(<ScrollerSentinelClientRect {...testProps} />)
      await expect(wrapper.getInstance().getNewCards()).resolves.toBe(undefined)
    })

    it('sets fetching status correctly', async () => {
      const wrapper = create(<ScrollerSentinelClientRect {...testProps} />)
      await wrapper.getInstance().getNewCards()
      expect(mockSetIsFetching.mock.calls).toEqual([[true], [false]])
    })
    
    it('awaits #cardFetcher', async () => {
      const wrapper = create(<ScrollerSentinelClientRect {...testProps} />)
      await wrapper.getInstance().getNewCards()
      expect(mockCardFetcher).toHaveBeenCalled()
    })
    
    it('calls #setNewCards', async () => {
      const wrapper = create(<ScrollerSentinelClientRect {...testProps} />)
      await wrapper.getInstance().getNewCards()
      expect(mockSetNewCards).toHaveBeenCalledTimes(1)
      expect(mockSetNewCards).toHaveBeenCalledWith(testCards)
    })

    it('calls #setEntryCount', async () => {
      const wrapper = create(<ScrollerSentinelClientRect {...testProps} />)
      const instance = wrapper.getInstance()
      instance.setState({ cards: testCards })

      mockSetEntryCount.mockClear()
      await instance.getNewCards()
      expect(mockSetEntryCount).toHaveBeenCalledTimes(1)
      expect(mockSetEntryCount).toHaveBeenCalledWith(testCards.length)
    })

    it('catches error if #cardFetcher fails', async () => {
      mockCardFetcher.mockRestore()
      mockCardFetcher = jest.spyOn(testProps, 'cardFetcher').mockImplementation(() => Promise.reject('mocked error'))
      const wrapper = create(<ScrollerSentinelClientRect {...testProps} />)
      await wrapper.getInstance().getNewCards()
      expect(mockSetState).toHaveBeenCalled()
    })
  })

  describe('#handleOnScroll', () => {
    let propsHandler, mockCanFetchCards, mockGetNewCards

    beforeEach(() => {
      propsHandler = {...testProps}
      propsHandler.isFetching = false
      mockGetNewCards = jest.spyOn(ScrollerSentinelClientRect.prototype, 'getNewCards').mockReturnValue(null)
      jest.spyOn(ScrollerSentinelClientRect.prototype, 'componentDidMount').mockReturnValue(null)
    })

    it('should call #getNewCards when all conditions match', () => {
      const wrapper = create(<ScrollerSentinelClientRect {...propsHandler} />)
      const instance = wrapper.getInstance()
      instance.refRoot.current = { getBoundingClientRect: () => ({ bottom: 200 }) }
      instance.refSentinel.current = { getBoundingClientRect: () => ({ top: 199 }) }
      instance.handleOnScroll()
      expect(mockGetNewCards).toHaveBeenCalledTimes(1)
    })

    describe('should not call #getNewCards if', () => {
      test('instance is fetching', () => {
        propsHandler.isFetching = true
        const wrapper = create(<ScrollerSentinelClientRect {...propsHandler} />)
        const instance = wrapper.getInstance()
        instance.refRoot.current = { getBoundingClientRect: () => ({ bottom: 200 }) }
        instance.refSentinel.current = { getBoundingClientRect: () => ({ top: 199 }) }
        instance.handleOnScroll()
        expect(mockGetNewCards).not.toHaveBeenCalled()
      })

      test('sentinel is not visible', () => {
        const wrapper = create(<ScrollerSentinelClientRect {...propsHandler} />)
        const instance = wrapper.getInstance()
        instance.refRoot.current = { getBoundingClientRect: () => ({ bottom: 200 }) }
        instance.refSentinel.current = { getBoundingClientRect: () => ({ top: 201 }) }
        instance.handleOnScroll()
        expect(mockGetNewCards).not.toHaveBeenCalled()
      })

      test('card.legth >= 200', () => {
        // env setup
        const wrapper = create(<ScrollerSentinelClientRect {...propsHandler} />)
        const instance = wrapper.getInstance()
        instance.refRoot.current = { getBoundingClientRect: () => ({ bottom: 200 }) }
        instance.refSentinel.current = { getBoundingClientRect: () => ({ top: 199 }) }
        // cards
        const mockEntry = 'card'
        let cards = new Array(199).fill(mockEntry)

        // 199 entries
        instance.setState({ cards })
        instance.handleOnScroll()
        expect(mockGetNewCards).toHaveBeenCalledTimes(1)
        // 200 entries
        cards = [mockEntry, ...cards]
        instance.setState({ cards })
        instance.handleOnScroll()
        expect(mockGetNewCards).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('Intergration', () => {
    it('matches snapshot for happy path', async () => {
      jest.spyOn(ScrollerSentinelClientRect.prototype, 'getNewCards').mockReturnValue([])
      const wrapper = create(<ScrollerSentinelClientRect {...testProps} />)
      const cards = [<div>one</div>, <div>two</div>]
      wrapper.getInstance().setState({ fetch: null, cards })
      expect(wrapper).toMatchSnapshot()
    })

    it('displays loading message on mount', () => {
      jest.spyOn(ScrollerSentinelClientRect.prototype, 'getNewCards').mockReturnValue(['one', 'two'])
      const wrapper = create(<ScrollerSentinelClientRect {...testProps} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('displays error message on mount if initial fetch throws error', async () => {
      jest.spyOn(testProps, 'cardFetcher')
        .mockImplementation(() => { throw new Error('mocked error') })

      const wrapper = create(<ScrollerSentinelClientRect {...testProps} />)
      expect(wrapper).toMatchSnapshot()
    })
    
    it('displays cards up to point if error thrown by #cardFetcher', async () => {
      const cards = ['one', 'two', 'three']
      jest.spyOn(ScrollerSentinelClientRect.prototype, 'getNewCards')
        .mockImplementation(function() { this.setState({ cards, fetch: null }) })
      const wrapper = mount(<ScrollerSentinelClientRect {...testProps} />)
      const instance = wrapper.instance()

      jest.restoreAllMocks()
      jest.spyOn(testProps, 'cardFetcher').mockImplementation(() => { throw new Error('mocked error') })
      expect(wrapper).toMatchSnapshot()
      
      const html = wrapper.html()
      instance.getNewCards()
      wrapper.update()
      expect(wrapper.html()).toEqual(html)
      wrapper.unmount()
    })
  })
})
