import React from 'react'
import { create } from 'react-test-renderer'
import emotionSerializer from 'jest-emotion'

import Card from '../Card'
import MockInfiniteScrollerApp from '../__tests__/__mocks__/MockInfiniteScrollerApp'


const renderApp = props => create(
  <MockInfiniteScrollerApp>
    <Card {...props} />
  </MockInfiniteScrollerApp>
)

describe('Card', () => {
  const testProps = {
    description: ['sentence 1', 'sentence 2'],
    forwardedRef: React.createRef(),
    imgUrl: 'http://test.com',
    title: 'test title',
    position: 1,
  }

  describe('props', () => {
    it('description is required', () => {
      const props = {...testProps}
      delete props.description
      expect(() => renderApp(props)).toThrow()
    })

    it('title is required', () => {
      const props = {...testProps}
      delete props.title
      expect(() => renderApp(props)).toThrow()
    })

    it('imgUrl is required', () => {
      const props = {...testProps}
      delete props.imgUrl
      expect(() => renderApp(props)).toThrow()
    })

    it('position is required', () => {
      const props = {...testProps}
      delete props.position
      expect(() => renderApp(props)).toThrow()
    })

    it('forwardedRef is not required', () => {
      const props = {...testProps}
      delete props.forwardedRef
      expect(() => renderApp(props)).not.toThrow()
    })
  })

  describe('snapshots', () => {
    beforeEach(() => {
      expect.addSnapshotSerializer(emotionSerializer)
    })

    it('all props', () => {
      expect(renderApp(testProps)).toMatchSnapshot()
    })

    it('required props', () => {
      const props = {...testProps}
      delete props.forwardedRef
      expect(renderApp(props)).toMatchSnapshot()
    })
  })

  it('connects forwardedRef to root element', () => {
    const props = {...testProps}
    props.forwardedRef = React.createRef()
    const wrapper = renderApp(props)
    const element = wrapper.root.findAllByType('article')
    expect(element).toHaveLength(1)
    expect(element[0].instance).toBe(props.forwardedRef.current)
  })
})
