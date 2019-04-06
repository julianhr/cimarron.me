import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { create } from 'react-test-renderer'

import { ScrollerContainerHeights } from '../ScrollerContainerHeights'


describe('ScrollerContainerHeights', () => {
  function fakeDiv(scrollHeight, scrollTop, clientHeight) {
    return { scrollHeight, scrollTop, clientHeight, }
  }

  const testProps = {
    cardFetcher: async () => ([]),
    isFetching: false,
    setEntryCount: () => {},
    setIsFetching: () => {},
  }

  describe('props', () => {
    test('cardFetcher is required', () => {
      const props = {...testProps}
      delete props.cardFetcher
      expect(() => render(<ScrollerContainerHeights {...props} />)).toThrow()
    })

    test('isFetching is required', () => {
      const props = {...testProps}
      delete props.isFetching
      expect(() => render(<ScrollerContainerHeights {...props} />)).toThrow()
    })

    test('setEntryCount is required', () => {
      const props = {...testProps}
      delete props.setEntryCount
      expect(() => render(<ScrollerContainerHeights {...props} />)).toThrow()
    })

    test('setIsFetching is required', () => {
      const props = {...testProps}
      delete props.setIsFetching
      expect(() => render(<ScrollerContainerHeights {...props} />)).toThrow()
    })
  })

  describe('#getCard', () => {
    const testDatum = {
      image_url: 'http://image.com',
      title: 'test title',
      description: ['sentence one', 'sentence two'],
      position: 4,
    }

    it('returns a Card element', () => {
      const wrapper = create(<ScrollerContainerHeights {...testProps} />)
      const i = 3, lastKey = 10
      expect(wrapper.getInstance().getCard(testDatum, i, lastKey)).toMatchSnapshot()
    })
  })

  describe('#setNewCards', () => {
    it('appends new cards to the current ones', () => {
      // setup env
      jest.spyOn(ScrollerContainerHeights.prototype, 'getCard').mockImplementation(arg => arg)
      jest.spyOn(ScrollerContainerHeights.prototype, 'getNewCards').mockReturnValue(null)
      const spySetState = jest.spyOn(ScrollerContainerHeights.prototype, 'setState')
      const testData1 = ['card 1', 'card 2']
      const testData2 = ['card 3', 'card 4']
      // render
      const wrapper = create(<ScrollerContainerHeights {...testProps} />)
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
      mockSetNewCards = jest.spyOn(ScrollerContainerHeights.prototype, 'setNewCards').mockReturnValue(null)
      mockSetState = jest.spyOn(ScrollerContainerHeights.prototype, 'setState')
      jest.spyOn(ScrollerContainerHeights.prototype, 'componentDidMount').mockReturnValue(null)
    })

    it('is async', async () => {
      const wrapper = create(<ScrollerContainerHeights {...testProps} />)
      await expect(wrapper.getInstance().getNewCards()).resolves.toBe(undefined)
    })

    it('sets fetching status correctly', async () => {
      const wrapper = create(<ScrollerContainerHeights {...testProps} />)
      await wrapper.getInstance().getNewCards()
      expect(mockSetIsFetching.mock.calls).toEqual([[true], [false]])
    })
    
    it('awaits #cardFetcher', async () => {
      const wrapper = create(<ScrollerContainerHeights {...testProps} />)
      await wrapper.getInstance().getNewCards()
      expect(mockCardFetcher).toHaveBeenCalled()
    })
    
    it('calls #setNewCards', async () => {
      const wrapper = create(<ScrollerContainerHeights {...testProps} />)
      await wrapper.getInstance().getNewCards()
      expect(mockSetNewCards).toHaveBeenCalledTimes(1)
      expect(mockSetNewCards).toHaveBeenCalledWith(testCards)
    })

    it('calls #setEntryCount', async () => {
      const wrapper = create(<ScrollerContainerHeights {...testProps} />)
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
      const wrapper = create(<ScrollerContainerHeights {...testProps} />)
      await wrapper.getInstance().getNewCards()
      expect(mockSetState).toHaveBeenCalled()
    })
  })

  describe('#canFetchCards', () => {
    it('returns false if bottom buffer area in container hidden', () => {
      const wrapper = create(<ScrollerContainerHeights {...testProps} />)
      const instance = wrapper.getInstance()
      expect(instance.canFetchCards( fakeDiv(1000, 0, 300)) ).toBe(false)
      expect(instance.canFetchCards( fakeDiv(1000, 200, 300)) ).toBe(false)
    })

    it('returns true if bottom buffer area in container is visible', () => {
      const wrapper = create(<ScrollerContainerHeights {...testProps} />)
      const instance = wrapper.getInstance()
      expect(instance.canFetchCards( fakeDiv(1000, 201, 300)) ).toBe(true)
      expect(instance.canFetchCards( fakeDiv(1000, 202, 300)) ).toBe(true)
    })
  })

  describe('#handleOnScroll', () => {
    let propsHandler, mockCanFetchCards, mockGetNewCards

    beforeEach(() => {
      propsHandler = {...testProps}
      propsHandler.isFetching = false
      mockCanFetchCards = jest.spyOn(ScrollerContainerHeights.prototype, 'canFetchCards').mockReturnValue(true)
      mockGetNewCards = jest.spyOn(ScrollerContainerHeights.prototype, 'getNewCards').mockReturnValue(null)
      jest.spyOn(ScrollerContainerHeights.prototype, 'componentDidMount').mockReturnValue(null)
    })

    it('should call #getNewCards when all conditions match', () => {
      const wrapper = create(<ScrollerContainerHeights {...propsHandler} />)
      wrapper.getInstance().handleOnScroll()
      expect(mockGetNewCards).toHaveBeenCalledTimes(1)
    })

    describe('should not call #getNewCards if', () => {
      test('instance is fetching', () => {
        propsHandler.isFetching = true
        const wrapper = create(<ScrollerContainerHeights {...propsHandler} />)
        wrapper.getInstance().handleOnScroll()
        expect(mockGetNewCards).not.toHaveBeenCalled()
      })

      test('cannot fetch', () => {
        mockCanFetchCards.mockRestore()
        jest.spyOn(ScrollerContainerHeights.prototype, 'canFetchCards').mockReturnValue(false)
        const wrapper = create(<ScrollerContainerHeights {...propsHandler} />)
        wrapper.getInstance().handleOnScroll()
        expect(mockGetNewCards).not.toHaveBeenCalled()
      })

      test('card.legth >= 200', () => {
        // env setup
        const wrapper = create(<ScrollerContainerHeights {...propsHandler} />)
        const instance = wrapper.getInstance()
        // Intersection Observer entries
        // cards
        const mockEntry = 'card'
        let cards = new Array(199).fill(mockEntry)

        // 199 entries
        instance.setState({ cards })
        wrapper.getInstance().handleOnScroll()
        expect(mockGetNewCards).toHaveBeenCalledTimes(1)
        // 200 entries
        cards = [mockEntry, ...cards]
        instance.setState({ cards })
        wrapper.getInstance().handleOnScroll()
        expect(mockGetNewCards).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('Intergration', () => {
    it('matches snapshot for happy path', async () => {
      jest.spyOn(ScrollerContainerHeights.prototype, 'getNewCards').mockReturnValue([])
      const wrapper = create(<ScrollerContainerHeights {...testProps} />)
      const cards = [<div>one</div>, <div>two</div>]
      wrapper.getInstance().setState({ fetch: null, cards })
      expect(wrapper).toMatchSnapshot()
    })

    it('displays loading message on mount', () => {
      jest.spyOn(ScrollerContainerHeights.prototype, 'getNewCards').mockReturnValue(['one', 'two'])
      const wrapper = create(<ScrollerContainerHeights {...testProps} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('displays error message on mount if initial fetch throws error', async () => {
      jest.spyOn(testProps, 'cardFetcher')
        .mockImplementation(() => { throw new Error('mocked error') })

      const wrapper = create(<ScrollerContainerHeights {...testProps} />)
      expect(wrapper).toMatchSnapshot()
    })
    
    it('displays cards up to point if error thrown by #cardFetcher', async () => {
      const cards = ['one', 'two', 'three']
      jest.spyOn(ScrollerContainerHeights.prototype, 'getNewCards')
        .mockImplementation(function() { this.setState({ cards, fetch: null }) })
      const wrapper = mount(<ScrollerContainerHeights {...testProps} />)
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
