import { List, Map, fromJS } from "immutable"
import { expect } from 'chai'

import { reducer } from "../src/reducer"

describe("reducer", () => {
  it("handles SET_ENTRIES", () => {
    const initialState = Map()
    const action = { type: "SET_ENTRIES", entries: ["1"] }
    const nextState = reducer(initialState, action)

    expect(nextState).to.eq(fromJS({
      entries: ["1"]
    }))

  })

  it("handles VOTE", () => {
    const initState = fromJS({
      vote: {
        pair: ["1", "2"]
      },
      entries: []

    })
    const action = { type: "VOTE", entry: "1" }
    const newState = reducer(initState, action)

    expect(newState).to.eq(fromJS({
      vote: {
        pair: ["1", "2"],
        tally: { "1": 1 }

      },
      entries: []

    }))
  })

  it("handles NEXT", () => {
    const state = fromJS({
      entries: ["1", "2"]
    })
    const action = { type: "NEXT" }
    const nextState = reducer(state, action)

    expect(nextState).to.eq(fromJS({
      vote: { pair: ["1", "2"] },
      entries: []
    }))
  })

  it("has initial state", () => {
    const action = { type: "SET_ENTRIES", entries: ["1", "2"] }
    const nextState = reducer(undefined, action)

    expect(nextState).to.eq(fromJS({
      entries: ["1", "2"]
    }))
  })

  it("can be used with iterable.reduce()", () => {
    const actions = [
      { type: "SET_ENTRIES", entries: ["1", "2"] },
      { type: 'NEXT' },
      { type: "VOTE", entry: "1" },
      { type: "VOTE", entry: "1" },
      { type: "VOTE", entry: "2" },
      { type: "NEXT" }
    ]

    const nextState = actions.reduce(reducer, Map())

    expect(nextState).to.eq(
      fromJS({
        winner: "1"
      })
    )

  })


})