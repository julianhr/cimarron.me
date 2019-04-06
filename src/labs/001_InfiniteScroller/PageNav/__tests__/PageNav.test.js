import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { create } from 'react-test-renderer'

import PageNav from '../PageNav'
import RootMock from '../../__tests__/__mocks__/RootMock'


describe('PageNav', () => {
  it('matches snapshot', () => {
    const wrapper = mount(
      <RootMock>
        <PageNav />
      </RootMock>
    )

    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })
})
