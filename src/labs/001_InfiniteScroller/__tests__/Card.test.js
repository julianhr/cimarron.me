import React from 'react'
import { create } from 'react-test-renderer'
import emotionSerializer from 'jest-emotion'

import Card from '../Card'
import withAppRoot from '~/components/library/withAppRoot'


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
      const RootedCard = withAppRoot(Card, props)
      expect(() => create(<RootedCard />)).toThrow()
    })

    it('title is required', () => {
      const props = {...testProps}
      delete props.title
      const RootedCard = withAppRoot(Card, props)
      expect(() => create(<RootedCard />)).toThrow()
    })

    it('imgUrl is required', () => {
      const props = {...testProps}
      delete props.imgUrl
      const RootedCard = withAppRoot(Card, props)
      expect(() => create(<RootedCard />)).toThrow()
    })

    it('position is required', () => {
      const props = {...testProps}
      delete props.position
      const RootedCard = withAppRoot(Card, props)
      expect(() => create(<RootedCard />)).toThrow()
    })

    it('forwardedRef is not required', () => {
      const props = {...testProps}
      delete props.forwardedRef
      const RootedCard = withAppRoot(Card, props)
      expect(() => create(<RootedCard />)).not.toThrow()
    })
  })

  describe('snapshots', () => {
    beforeEach(() => {
      expect.addSnapshotSerializer(emotionSerializer)
    })

    it('all props', () => {
      const RootedCard = withAppRoot(Card, testProps)
      const wrapper = create(<RootedCard />)
      expect(wrapper).toMatchSnapshot()
    })

    it('required props', () => {
      const props = {...testProps}
      delete props.forwardedRef
      const RootedCard = withAppRoot(Card, props)
      const wrapper = create(<RootedCard />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  it('connects forwardedRef to root element', () => {
    const props = {...testProps}
    props.forwardedRef = React.createRef()
    const RootedCard = withAppRoot(Card, props)
    const wrapper = create(<RootedCard />)
    const element = wrapper.root.findAllByType('article')
    expect(element).toHaveLength(1)
    expect(element[0].instance).toBe(props.forwardedRef.current)
  })
})
