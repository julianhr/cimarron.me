import React from 'react'
import { create } from 'react-test-renderer'

import { Description, SCROLLERS } from '../Description'
import MockRoot from '../../__tests__/__mocks__/RootMock'


describe('Description', () => {
  describe('snapshots', () => {
    it('with valid md file', () => {
      const mdString = Object.keys(SCROLLERS)[0]
  
      const wrapper = create(
        <MockRoot>
          <Description scrollerType={mdString} />
        </MockRoot>
      )
      expect(wrapper).toMatchSnapshot('valid md file')
    })
  })

  it('with invalid md file', () => {
      const wrapper = create(
        <MockRoot>
          <Description scrollerType={'invalid'} />
        </MockRoot>
      )
      expect(wrapper).toMatchSnapshot('invalid md file')
      
      wrapper.update(
        <MockRoot>
          <Description />
        </MockRoot>
      )
      expect(wrapper).toMatchSnapshot('no md file')
  })

  it('with invalid md file', () => {
    for (let [key, _] of Object.entries(SCROLLERS)) {
      const wrapper = create(
        <MockRoot>
          <Description scrollerType={key} />
        </MockRoot>
      )

      const nodes = wrapper.root.findAll(node => node.props.hasOwnProperty('dangerouslySetInnerHTML'))
      expect(nodes).toHaveLength(1)
    }
  })
})
