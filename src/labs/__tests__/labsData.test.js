import React from 'react'

import DATA, { LAB_SHAPE } from '../labsData'


describe('labsData.js', () => {
  it('adheres to the Json shape', () => {
    DATA.forEach(lab => {
      for (let [key, types] of Object.entries(LAB_SHAPE)) {
        expect(key in lab).toBe(true)
        expect(types).toContain(typeof lab[key])
      }
    })
  })
})
