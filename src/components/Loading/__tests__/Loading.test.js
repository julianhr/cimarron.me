import React from 'react'
import { render } from 'enzyme'
import emotionSerializer from 'jest-emotion'

import Loading from '../Loading'


describe('Loading', () => {
  it('matches snapshot', () => {
    const wrapper = render(<Loading />)
    expect.addSnapshotSerializer(emotionSerializer)
    expect(wrapper).toMatchSnapshot()
  })
})
