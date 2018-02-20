import { Map, fromJS } from 'immutable'
import { expect } from 'chai'

import makeStore from '../src/store'

describe("redux store", () => {
  it("is a redux store with the correct reducer config", () => {
    const store = makeStore()
    expect(store.getState()).to.eq(Map())

    store.dispatch({ type: "SET_ENTRIES", entries: ['1', '2'] })
    expect(store.getState()).to.eq(fromJS({
      entries: ["1", "2"]
    }))

  })



})