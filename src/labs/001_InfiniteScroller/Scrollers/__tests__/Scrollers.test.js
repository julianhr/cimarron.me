import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { create } from 'react-test-renderer'

import { Scrollers, SCROLLERS } from '../Scrollers'
import RootMock from '../../__tests__/__mocks__/RootMock'


describe('Scrollers', () => {
  const testProps = {
    recordsPerFetch: 5,
    scrollerType: Object.keys(SCROLLERS)[0],
  }

  const renderRooted = (props) => mount(<RootMock><Scrollers {...props} /></RootMock>)

  describe('props', () => {
    it('recordsPerFetch is required', () => {
      const props = {...testProps}
      delete props.recordsPerFetch
      expect(() => renderRooted(props)).toThrow()
    })

    it('scrollerType is required', () => {
      const props = {...testProps}
      delete props.scrollerType
      expect(() => renderRooted(props)).toThrow()
    })
  })

  describe('#fetchCards', () => {
    let { fetch: origFetch } = global

    afterEach(() => {
      global.fetch = origFetch
    })

    it('is async', async () => {
      jest.spyOn(Scrollers.prototype, 'fetchCards')
        .mockImplementation(() => Promise.resolve(true))
      const wrapper = renderRooted(testProps)
      const instance = wrapper.find(Scrollers).instance()
      await expect(instance.fetchCards()).resolves.toBe(true)
    })

    it('returns json if fetch is successful', async () => {
      const jsonFn = () => ({ one: 1, two: 2 })
      const res = { ok: true, json: jsonFn }
      global.fetch = async () => res
      const wrapper = renderRooted(testProps)
      const instance = wrapper.find(Scrollers).instance()
      await expect(instance.fetchCards()).resolves.toEqual(jsonFn())
    })

    it('throw exception if fetch is unsuccessful', async () => {
      global.fetch = async () => ({ ok: false })
      const wrapper = renderRooted(testProps)
      const instance = wrapper.find(Scrollers).instance()
      await expect(instance.fetchCards()).rejects.toThrow()
    })
  })

  it('matches snapshot with all props', () => {
    const wrapper = renderRooted(testProps)
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })
})
