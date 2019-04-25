import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { create } from 'react-test-renderer'
import * as Sentry from '@sentry/browser'

import { Scrollers, SCROLLERS } from '../Scrollers'
import MockInfiniteScrollerApp from '../../__tests__/__mocks__/MockInfiniteScrollerApp'


describe('Scrollers', () => {
  const testProps = {
    recordsPerFetch: 5,
    scrollerType: Object.keys(SCROLLERS)[0],
  }

  const mountApp = (props) => mount(
    <MockInfiniteScrollerApp>
      <Scrollers {...props} />
    </MockInfiniteScrollerApp>
  )

  let wrapper

  afterEach(() => {
    if (wrapper) { wrapper.unmount() }
  })

  describe('props', () => {
    it('recordsPerFetch is required', () => {
      const props = {...testProps}
      delete props.recordsPerFetch
      expect(() => mountApp(props)).toThrow()
    })

    it('scrollerType is required', () => {
      const props = {...testProps}
      delete props.scrollerType
      expect(() => mountApp(props)).toThrow()
    })
  })

  describe('#fetchCards', () => {
    let { fetch: origFetch } = global

    afterEach(() => {
      global.fetch = origFetch
    })

    it('returns json if fetch is successful', async () => {
      const jsonFn = () => ({ one: 1, two: 2 })
      const res = { ok: true, json: jsonFn }
      global.fetch = async () => res
      wrapper = mountApp(testProps)
      const instance = wrapper.find(Scrollers).instance()
      await expect(instance.fetchCards()).resolves.toEqual(jsonFn())
    })

    it('reports and throws exception if fetch raises exception', async () => {
      global.fetch = async () => { throw new Error('test error') }
      const spySentry = jest.spyOn(Sentry, 'captureException')
      wrapper = mountApp(testProps)
      const instance = wrapper.find(Scrollers).instance()
      await expect(instance.fetchCards()).rejects.toThrow()
      expect(spySentry).toHaveBeenCalledTimes(1)
    })

    it('reports and throws exception if fetch resp is not 2xx', async () => {
      const spySentry = jest.spyOn(Sentry, 'captureException')
      global.fetch = async () => ({
        ok: false,
        text: async () => 'test error text',
        json: async () => 'test error json',
      })
      wrapper = mountApp(testProps)
      const instance = wrapper.find(Scrollers).instance()
      await expect(instance.fetchCards()).rejects.toThrow()
      expect(spySentry).toHaveBeenCalledTimes(1)
    })
  })

  it('matches snapshot with all props', () => {
    wrapper = mountApp(testProps)
    expect(wrapper).toMatchSnapshot()
  })
})
