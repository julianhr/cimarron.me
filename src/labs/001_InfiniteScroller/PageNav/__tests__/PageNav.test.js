import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { create } from 'react-test-renderer'

import PageNav from '../PageNav'
import MockInfiniteScrollerApp from '../../__tests__/__mocks__/MockInfiniteScrollerApp'


describe('PageNav', () => {
  it('matches snapshot', () => {
    const wrapper = mount(
      <MockInfiniteScrollerApp>
        <PageNav />
      </MockInfiniteScrollerApp>
    )

    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })
})
