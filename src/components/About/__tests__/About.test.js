import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { create } from 'react-test-renderer'

import About from '../About'
import MockApp from '~/__tests__/__mocks__/MockApp'


describe('About', () => {
  it('matches snapshot', () => {
    const wrapper = create(
      <MockApp>
        <About />
      </MockApp>
    )

    expect(wrapper).toMatchSnapshot()
  })
})

