import React from 'react'
import { create } from 'react-test-renderer'

import { Description, SCROLLERS } from '../Description'
import MockInfiniteScrollerApp from '../../__tests__/__mocks__/MockInfiniteScrollerApp'


describe('Description', () => {
  describe('snapshots', () => {
    it('with valid md file', () => {
      const mdString = Object.keys(SCROLLERS)[0]
  
      const wrapper = create(
        <MockInfiniteScrollerApp>
          <Description scrollerType={mdString} />
        </MockInfiniteScrollerApp>
      )
      expect(wrapper).toMatchSnapshot('valid md file')
    })
  })

  it('with invalid md file', () => {
      const wrapper = create(
        <MockInfiniteScrollerApp>
          <Description scrollerType={'invalid'} />
        </MockInfiniteScrollerApp>
      )
      expect(wrapper).toMatchSnapshot('invalid md file')
      
      wrapper.update(
        <MockInfiniteScrollerApp>
          <Description />
        </MockInfiniteScrollerApp>
      )
      expect(wrapper).toMatchSnapshot('no md file')
  })

  it('with invalid md file', () => {
    for (let [key, _] of Object.entries(SCROLLERS)) {
      const wrapper = create(
        <MockInfiniteScrollerApp>
          <Description scrollerType={key} />
        </MockInfiniteScrollerApp>
      )

      const nodes = wrapper.root.findAll(node => node.props.hasOwnProperty('dangerouslySetInnerHTML'))
      expect(nodes).toHaveLength(1)
    }
  })
})
