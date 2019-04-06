import React from 'react'
import { mount } from 'enzyme'

import InfiniteScroller from '../InfiniteScroller'
import withAppRoot from '~/components/library/withAppRoot'


describe('index.js', () => {
  it('mounts without crashing', () => {
    const RootedIndex = withAppRoot(InfiniteScroller)
    let wrapper
    expect(() => { wrapper = mount(<RootedIndex />) }).not.toThrow()
    wrapper.unmount()
  })
})
