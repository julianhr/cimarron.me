import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { create } from 'react-test-renderer'

import SpoofEmail from '../SpoofEmail'
import MockApp from '~/__tests__/__mocks__/MockApp'


describe('SpoofEmail', () => {
  it('matches snapshot', () => {
    const wrapper = render(
      <MockApp>
        <SpoofEmail />
      </MockApp>
    )

    expect(wrapper).toMatchSnapshot()
  })
})
