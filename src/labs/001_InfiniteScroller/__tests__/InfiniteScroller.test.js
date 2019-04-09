import React from 'react'
import { mount } from 'enzyme'

import { InfiniteScroller } from '../InfiniteScroller'
import MockInfiniteScrollerApp from '../__tests__/__mocks__/MockInfiniteScrollerApp'


describe('index.js', () => {
  it('mounts without crashing', () => {
    let wrapper

    expect(() => wrapper = mount(
      <MockInfiniteScrollerApp>
        <InfiniteScroller />
      </MockInfiniteScrollerApp>
    )).not.toThrow()

    wrapper.unmount()
  })
})
