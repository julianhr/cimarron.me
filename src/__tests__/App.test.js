import React from 'react'
import { create } from 'react-test-renderer'

import App from '../App'


describe('App', () => {
  it('renders without crashing', () => {
    // Enzyme doesn't support suspense yet
    expect(() => create(<App />)).not.toThrow()
  })
})
