import React from 'react'
import { render, mount, shallow } from 'enzyme'
import { create } from 'react-test-renderer'

import EmailSent from '../EmailSent'
import MockApp from '~/__tests__/__mocks__/MockApp'


describe('EmailSent', () => {
  it('matches snapshot', () => {
    const wrapper = render(
      <MockApp>
        <EmailSent />
      </MockApp>
    )

    expect(wrapper).toMatchSnapshot()
  })
})
