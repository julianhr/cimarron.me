import React from 'react'
import { create } from 'react-test-renderer'
import emotionSerializer from 'jest-emotion'

import { ScrollerStatus }  from '../ScrollerStatus'
import { sleep } from '~/__tests__/utils'


describe('ScrollerStatus', () => {
  describe('flash animation', () => {
    test('animation steps', async (done) => {
      expect.addSnapshotSerializer(emotionSerializer)

      const { setState } = ScrollerStatus.prototype
      const mockSetState = jest.fn(setState)
      ScrollerStatus.prototype.setState = mockSetState

      const wrapper = create(<ScrollerStatus />)
      wrapper.getInstance().animateFlash()
      await sleep(100)
      expect(mockSetState.mock.calls).toMatchSnapshot()

      // cleanup
      ScrollerStatus.prototype.setState = setState
      done()
    })

    it('flashState defaults to reset', () => {
      const wrapper = create(<ScrollerStatus />)
      expect(wrapper.getInstance().state['flashState']).toBe('reset')
    })

    it('renders styles correctly', () => {
      expect.addSnapshotSerializer(emotionSerializer)
      const wrapper = create(<ScrollerStatus entryCount={5} />)
      const instance = wrapper.getInstance()

      for (let flashState  of ['reset', 'stage', 'transition']) {
        instance.setState({ flashState })
        expect(wrapper).toMatchSnapshot(flashState)
      }
    })
  })

  test('#canAnimate', async (done) => {
    jest.setTimeout(500)

    // promisify #canAnimate so it can be awaited
    const { canAnimate } = ScrollerStatus.prototype
    const promise = new Promise(resolve => {
      ScrollerStatus.prototype.canAnimate = function() {
        resolve(this.state)
        return canAnimate.call(this)
      }
    })
    // mock #animateFlash to test #canAnimate is gatekeeping correctly
    const { animateFlash } = ScrollerStatus.prototype
    const mockAnimateFlash = jest.fn(animateFlash)
    ScrollerStatus.prototype.animateFlash = mockAnimateFlash
    // set up
    const wrapper = create(<ScrollerStatus />)
    const instance = wrapper.getInstance()
    const testCases = [
      [0, false, 0, 0], // initial state
      [5, false, 1, 0], // first fetch
      [10, true, 2, 1], // second fetch
      [15, true, 3, 2], // more than 2 fetches
      [0, false, 0, 2], // new scroller selected
    ]

    for (let [entryCount, shouldAnimate, fetchCount, callCountMock] of testCases) {
      if (instance.props['entryCount'] !== entryCount) {
        // wrapper.setProps({ entryCount })
        wrapper.update(<ScrollerStatus entryCount={entryCount} />)
        await promise
      }
      expect(instance.state['fetchCount']).toEqual(fetchCount)
      expect(mockAnimateFlash).toBeCalledTimes(callCountMock)
      expect(canAnimate.call(instance)).toBe(shouldAnimate)
    }

    // cleanup
    ScrollerStatus.prototype.canAnimate = canAnimate
    ScrollerStatus.prototype.animateFlash = animateFlash
    done()
  })
})
