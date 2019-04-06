import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { create } from 'react-test-renderer'

import { ScrollerSentinelIntObs } from '../ScrollerSentinelIntObs'


class FakeIntersectionObserverEntry {
  constructor(element) {
    this.entry = element
  }

  get isIntersecting() { return true }
}

class FakeIntersectionObserver {
  constructor(handler) {
    this.handler = handler
    this.entries = []
  }

  observe(element) {
    const entry = new FakeIntersectionObserverEntry(element)
    this.entries.push(entry)
  }

  unobserve(element) { !!element }

  execute() {
    this.handler(this.entries)
  }
}

describe('ScrollerSentinelIntObs', () => {
  const { IntersectionObserver: origIntersectionObserver } = global
  const testProps = {
    cardFetcher: async () => ([]),
    isFetching: false,
    sentinelPosition: 5,
    setEntryCount: () => {},
    setIsFetching: () => {},
  }

  afterEach(() => {
    global.IntersectionObserver = origIntersectionObserver
  })

  describe('props', () => {
    test('cardFetcher is required', () => {
      const props = {...testProps}
      delete props.cardFetcher
      expect(() => render(<ScrollerSentinelIntObs {...props} />)).toThrow()
    })

    test('isFetching is required', () => {
      const props = {...testProps}
      delete props.isFetching
      expect(() => render(<ScrollerSentinelIntObs {...props} />)).toThrow()
    })

    test('sentinelPosition is required', () => {
      const props = {...testProps}
      delete props.sentinelPosition
      expect(() => render(<ScrollerSentinelIntObs {...props} />)).toThrow()
    })

    test('setEntryCount is required', () => {
      const props = {...testProps}
      delete props.setEntryCount
      expect(() => render(<ScrollerSentinelIntObs {...props} />)).toThrow()
    })

    test('setIsFetching is required', () => {
      const props = {...testProps}
      delete props.setIsFetching
      expect(() => render(<ScrollerSentinelIntObs {...props} />)).toThrow()
    })
  })

  describe('#isSupported', () => {
    it('returns true if Interserction Observer supported by the browser', () => {
      global.IntersectionObserver = undefined
      const wrapper = create(<ScrollerSentinelIntObs {...testProps} />)
      expect(wrapper.getInstance().isSupported()).toBe(false)
    })

    it('returns false if Intersection Observer not supported by the browser', () => {
      global.IntersectionObserver = FakeIntersectionObserver
      const wrapper = create(<ScrollerSentinelIntObs {...testProps} />)
      expect(wrapper.getInstance().isSupported()).toBe(true)
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
      const wrapper = create(<ScrollerSentinelIntObs {...testProps} />)
      const instance = wrapper.getInstance()
      const article = document.createElement('article')
      const i = 3, sentinelPosition = 5, lastKey = 10

      instance.refSentinel = article
      expect(instance.getCard(testDatum, i, sentinelPosition, lastKey)).toMatchSnapshot()
    })

    it('returns a sentinel Card element if datum index == sentinel index', () => {
      const wrapper = create(<ScrollerSentinelIntObs {...testProps} />)
      const instance = wrapper.getInstance()
      const article = document.createElement('article')
      const i = 3, sentinelPosition = 4, lastKey = 10

      instance.refSentinel = article
      expect(instance.getCard(testDatum, i, sentinelPosition, lastKey)).toMatchSnapshot()
    })
  })

  describe('#setNewCards', () => {
    it('should unobserve element if one is being observed', () => {
      // setup env
      global.IntersectionObserver = FakeIntersectionObserver
      jest.spyOn(ScrollerSentinelIntObs.prototype, 'getCard').mockReturnValue('mock card')
      const spySetState = jest.spyOn(ScrollerSentinelIntObs.prototype, 'setState')
      const spy = jest.spyOn(FakeIntersectionObserver.prototype, 'unobserve')
      const article = document.createElement('element')
      const testData = [1,2,3]
      // render
      const wrapper = create(<ScrollerSentinelIntObs {...testProps} />)
      const instance = wrapper.getInstance()
      // test without ref set
      instance.setNewCards(testData)
      expect(spy).not.toHaveBeenCalled()
      // test with ref set
      instance.refSentinel.current = article
      instance.setNewCards(testData)
      expect(spy).toHaveBeenCalledWith(article)
    })

    it('appends new cards to the current ones', () => {
      // setup env
      global.IntersectionObserver = FakeIntersectionObserver
      jest.spyOn(ScrollerSentinelIntObs.prototype, 'getCard').mockImplementation(arg => arg)
      jest.spyOn(ScrollerSentinelIntObs.prototype, 'getNewCards').mockReturnValue(null)
      const spySetState = jest.spyOn(ScrollerSentinelIntObs.prototype, 'setState')
      const testData1 = ['card 1', 'card 2']
      const testData2 = ['card 3', 'card 4']
      // render
      const wrapper = create(<ScrollerSentinelIntObs {...testProps} />)
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
      mockSetNewCards = jest.spyOn(ScrollerSentinelIntObs.prototype, 'setNewCards').mockReturnValue(null)
      mockSetState = jest.spyOn(ScrollerSentinelIntObs.prototype, 'setState')
    })

    it('is async', async () => {
      const wrapper = create(<ScrollerSentinelIntObs {...testProps} />)
      await expect(wrapper.getInstance().getNewCards()).resolves.toBe(undefined)
    })

    it('sets fetching status correctly', async () => {
      const wrapper = create(<ScrollerSentinelIntObs {...testProps} />)
      mockSetIsFetching.mockClear()
      await wrapper.getInstance().getNewCards()
      expect(mockSetIsFetching.mock.calls).toEqual([[true], [false]])
    })
    
    it('awaits #cardFetcher', async () => {
      const wrapper = create(<ScrollerSentinelIntObs {...testProps} />)
      await wrapper.getInstance().getNewCards()
      expect(mockCardFetcher).toHaveBeenCalled()
    })
    
    it('calls #setNewCards', async () => {
      const wrapper = create(<ScrollerSentinelIntObs {...testProps} />)
      await wrapper.getInstance().getNewCards()
      expect(mockSetNewCards).toHaveBeenCalledTimes(1)
      expect(mockSetNewCards).toHaveBeenCalledWith(testCards)
    })

    it('calls #setEntryCount', async () => {
      const wrapper = create(<ScrollerSentinelIntObs {...testProps} />)
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
      const wrapper = create(<ScrollerSentinelIntObs {...testProps} />)
      await wrapper.getInstance().getNewCards()
      expect(mockSetState).toHaveBeenCalled()
    })
  })

  describe('#handleIntObs', () => {
    let propsIntObs, mockGetNewCards

    beforeEach(() => {
      propsIntObs = {...testProps}
      propsIntObs.isFetching = false
      mockGetNewCards = jest.spyOn(ScrollerSentinelIntObs.prototype, 'getNewCards').mockReturnValue(null)
    })

    it('should call #getNewCards when all conditions match', () => {
      const wrapper = create(<ScrollerSentinelIntObs {...propsIntObs} />)
      const cb = wrapper.getInstance().handleIntObs()
      const element = document.createElement('article')
      const entries = [new FakeIntersectionObserverEntry(element)]
      cb(entries)
      expect(mockGetNewCards).toHaveBeenCalledTimes(1)
    })

    describe('should not call #getNewCards if', () => {
      test('element is not intersecting', () => {
        jest.spyOn(FakeIntersectionObserverEntry.prototype, 'isIntersecting', 'get')
          .mockReturnValue(false)
        const wrapper = create(<ScrollerSentinelIntObs {...propsIntObs} />)
        const cb = wrapper.getInstance().handleIntObs()
        const element = document.createElement('article')
        const entries = [new FakeIntersectionObserverEntry(element)]
        cb(entries)
        expect(mockGetNewCards).not.toHaveBeenCalled()
      })

      test('instance is fetching', () => {
        propsIntObs.isFetching = true
        const wrapper = create(<ScrollerSentinelIntObs {...propsIntObs} />)
        const cb = wrapper.getInstance().handleIntObs()
        const element = document.createElement('article')
        const entries = [new FakeIntersectionObserverEntry(element)]
        cb(entries)
        expect(mockGetNewCards).not.toHaveBeenCalled()
      })

      test('card.legth >= 200', () => {
        // env setup
        const wrapper = create(<ScrollerSentinelIntObs {...propsIntObs} />)
        const instance = wrapper.getInstance()
        const cb = instance.handleIntObs()
        // Intersection Observer entries
        const element = document.createElement('article')
        const entries = [new FakeIntersectionObserverEntry(element)]
        // cards
        const mockEntry = 'card'
        let cards = new Array(199).fill(mockEntry)

        // 199 entries
        instance.setState({ cards })
        cb(entries)
        expect(mockGetNewCards).toHaveBeenCalledTimes(1)
        // 200 entries
        cards = [mockEntry, ...cards]
        instance.setState({ cards })
        cb(entries)
        expect(mockGetNewCards).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('Intergration', () => {
    it('matches snapshot for happy path', async () => {
      global.IntersectionObserver = FakeIntersectionObserver
      jest.spyOn(ScrollerSentinelIntObs.prototype, 'getNewCards').mockReturnValue([])
      const wrapper = create(<ScrollerSentinelIntObs {...testProps} />)
      const cards = [<div>one</div>, <div>two</div>]
      wrapper.getInstance().setState({ fetch: null, cards })
      expect(wrapper).toMatchSnapshot()
    })

    describe('Intersection Observer', () => {
      it('displays loading message on mount if supported', () => {
        global.IntersectionObserver = FakeIntersectionObserver
        jest.spyOn(ScrollerSentinelIntObs.prototype, 'getNewCards').mockReturnValue(['one', 'two'])
        const wrapper = create(<ScrollerSentinelIntObs {...testProps} />)
        expect(wrapper).toMatchSnapshot()
      })
  
      it('displays message if not supported', () => {
        global.IntersectionObserver = undefined
        const wrapper = create(<ScrollerSentinelIntObs {...testProps} />)
        expect(wrapper).toMatchSnapshot()
      })
    })

    it('displays error message on mount if initial fetch throws error', async () => {
      global.IntersectionObserver = FakeIntersectionObserver
      jest.spyOn(testProps, 'cardFetcher')
        .mockImplementation(() => { throw new Error('mocked error') })
      
      const wrapper = create(<ScrollerSentinelIntObs {...testProps} />)
      expect(wrapper).toMatchSnapshot()
    })
    
    it('displays cards up to point if error thrown by #cardFetcher', async () => {
      global.IntersectionObserver = FakeIntersectionObserver
      const cards = ['one', 'two', 'three']
      jest.spyOn(ScrollerSentinelIntObs.prototype, 'getNewCards')
        .mockImplementation(function() { this.setState({ cards, fetch: null }) })
      const wrapper = mount(<ScrollerSentinelIntObs {...testProps} />)
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
