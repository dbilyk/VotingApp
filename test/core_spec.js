import { List, Map } from "immutable"
import { expect } from "chai"

import { setEntries, next, vote } from "../src/core"

describe("application logic", () => {
  describe("setEntries", () => {
    it("adds entries to the state", () => {
      const state = Map();
      const entries = List.of("Trainspotting", "28 Days Later")
      const nextState = setEntries(state, entries)

      expect(nextState).to.equal(Map({ entries: entries }))
    })

    it("converts to List", () => {
      const state = Map()
      const entries = ["movie1", "movie2"]
      const nextState = setEntries(state, entries)

      expect(nextState).to.equal(Map({
        entries: List.of('movie1', 'movie2')
      }))
    })

  })

  describe("next vote", () => {
    it("Takes the top two entries under vote", () => {
      const state = Map({
        entries: List.of(
          "movie1",
          "movie2",
          "movie3",
          "movie4"
        )
      })
      const nextState = next(state)

      expect(nextState).to.equal(Map({
        vote: Map({ pair: List.of("movie1", "movie2") }),
        entries: List.of("movie3", "movie4")
      }))
    })
  })

  //unfinished
  describe("vote", () => {
    it("creates a new tally object if none exists", () => {
      const state = Map({
        vote: Map({ pair: List.of("1", '2') }),
        entries: List.of("3", "4")
      })
      const nextState = vote(state, "1")

      expect(nextState).to.eq(map({
        vote: Map({
          pair: List.of("1", "2"),
          tally: Map({ "1": 1 })
        })
      }))

    })


  })


})