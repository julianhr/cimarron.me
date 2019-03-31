import React from 'react'
import { render } from 'enzyme'

import TopNav from '../TopNav'
import withAppRoot from '~/components/library/withAppRoot'


describe('TopNav', () => {
  it('should match snapshot', () => {
    const RootedTopNav = withAppRoot(TopNav)
    const wrapper = render(<RootedTopNav />)
    expect(wrapper).toMatchSnapshot()
  })
})
