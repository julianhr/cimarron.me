import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { create } from 'react-test-renderer'

import { urlBuilder, API_SUB_DOMAINS, getRangeArray } from '../index.js'


describe('#urlBuilder', () => {
  it('if no basePath given it throws error', () => {
    expect(() => urlBuilder()).toThrow()
  })

  describe('production', () => {
    const oldEnv = process.env
    const urlBase = 'https://api.flask.cimarron.me'

    beforeAll(() => {
      process.env = { NODE_ENV: 'production' }
    })

    afterAll(() => {
      process.env = oldEnv
    })

    it('returns a valid url', () => {
      const cases = {
        '/': '/',
        '/path/start/slash': '/path/start/slash/',
        '/path/start/slash/': '/path/start/slash/',
        'path/start/empty': '/path/start/empty/',
        'path/start/empty/': '/path/start/empty/',
      }

      for (let [path, expected] of Object.entries(cases)) {
        const url = urlBuilder(path)
        expect(url).toEqual(urlBase + expected)
      }
    })

    it('appends query params', () => {
      const cases = [
        ['/', { num: 1, foo: 'bar' }, '/?num=1&foo=bar'],
        ['/test/path', { num: 1, foo: 'bar' }, '/test/path/?num=1&foo=bar'],
        ['test/path', { num: 1, foo: 'bar' }, '/test/path/?num=1&foo=bar'],
        ['test/path/', { num: 1, foo: 'bar' }, '/test/path/?num=1&foo=bar'],
      ]

      for (let [path, query, expected] of cases) {
        const url = urlBuilder(path, query)
        expect(url).toEqual(urlBase + expected)
      }
    })

    it('adds a port', () => {
      const cases = [
        ['/', {}, 300, ':300/'],
        ['/', { foo: 'bar' }, 300, ':300/?foo=bar'],
        ['/path', {}, 300, ':300/path/'],
        ['/path/', {}, 300, ':300/path/'],
        ['/path/that', { foo: 'bar' }, 300, ':300/path/that/?foo=bar'],
      ]

      for (let [path, query, port, expected] of cases) {
        const url = urlBuilder(path, query, port)
        expect(url).toEqual(urlBase + expected)
      }
    })

    it('throws error if subdomain is not in whitelist', () => {
      expect(() => urlBuilder('/', {}, null, 'invalid') ).toThrow()
    })

    it('prepends whitelisted subdomain', () => {
      for (let sub of API_SUB_DOMAINS) {
        const cases = [
          ['/', {}, 300, sub, `https://${sub}.cimarron.me:300/`],
          ['/', {}, null, sub, `https://${sub}.cimarron.me/`],
          ['/path/that', {foo: 'bar'}, null, sub, `https://${sub}.cimarron.me/path/that/?foo=bar`],
        ]
  
        for (let [path, query, port, api, expected] of cases) {
          const url = urlBuilder(path, query, port, api)
          expect(url).toEqual(expected)
        }
      }
    })
  })

  describe('localhost', () => {
    it('works correctly', () => {
      const cases = [
        ['/', {}, 700, `http://localhost:700/`],
        ['/', {}, null, `http://localhost:5000/`],
        ['/path/that', {foo: 'bar'}, null, `http://localhost:5000/path/that/?foo=bar`],
        ['/path/that', {foo: 'bar'}, 700, `http://localhost:700/path/that/?foo=bar`],
      ]

      for (let [path, query, port, expected] of cases) {
        const url = urlBuilder(path, query, port)
        expect(url).toEqual(expected)
      }
    })
  })
})

describe('#getRangeArray', () => {
  it('returns an empty array if no range', () => {
    const cases = [
      [0, 0],
      [10, 10],
      [100, 90],
    ]

    cases.forEach(({min, max}) => expect(getRangeArray(min, max)).toEqual([]))
  })

  it('returns range of numbers', () => {
    const cases = [
      [0, 3, [0,1,2,3]],
      [95, 99, [95, 96, 97, 98, 99]],
    ]

    cases.forEach(([min, max, expected]) => {
      expect( getRangeArray(min, max) ).toEqual(expected)
    })
  })

  it('returns range of numbers as strings', () => {
    const cases = [
      [0, 3, '0 1 2 3'.split(' ')],
      [95, 99, '95 96 97 98 99'.split(' ')],
    ]

    cases.forEach(([min, max, expected]) => {
      expect( getRangeArray(min, max, true) ).toEqual(expected)
    })
  })
})
