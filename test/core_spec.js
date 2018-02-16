import { List, Map, fromJS } from "immutable"
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

  describe("next", () => {
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

    it("puts winner back into entries", () => {
      const state = fromJS({
        vote: {
          pair: ["1", "2"],
          tally: {
            "1": 3,
            "2": 2
          }
        },
        entries: ["3", "4"]
      })

      const nextState = next(state)

      expect(nextState).to.equal(fromJS(
        {
          vote: {
            pair: ["3", "4"]
          },
          entries: ["1"]
        }
      ))
    })

    it("puts both from tied vote back into entries", () => {
      const state = fromJS({
        vote: {
          pair: ["1", "2"],
          tally: {
            "1": 2,
            "2": 2
          }
        },
        entries: ["3", "4"]
      })

      const nextState = next(state)

      expect(nextState).to.equal(fromJS(
        {
          vote: {
            pair: ["3", "4"]
          },
          entries: ["1", "2"]
        }
      ))


    })

    it("sets the winner prop when one entry is left, removes vote and entries", () => {
      const state = fromJS({
        vote: {
          pair: ["1", "2"],
          tally: {
            "1": 2,
            "2": 1
          }
        },
        entries: []

      })

      const nextState = next(state)

      expect(nextState.get("winner")).to.eq("1")
      expect(nextState.get("votes")).to.be.undefined
      expect(nextState.get("entries")).to.be.undefined

    })



  })

  //unfinished
  describe("vote", () => {
    it("creates a new tally object if none exists", () => {
      const state = Map({
        vote: Map(
          {
            pair: List.of("1", '2')
          }),
        entries: List()
      })

      const nextState = vote(state, "1")

      expect(nextState).to.eq(Map({
        vote: Map({
          pair: List.of("1", "2"),
          tally: Map({ "1": 1 })
        }),
        entries: List()
      }))

    })

    it("increments an existing entry", () => {
      const state = Map({
        vote: Map({
          pair: List.of("1", "2"),
          tally: Map({
            "1": 1,
            "2": 1
          })
        })
      })

      const nextState = vote(state, "1")

      expect(nextState).to.equal(
        Map({
          vote: Map({
            pair: List.of("1", "2"),
            tally: Map({
              "1": 2,
              "2": 1
            })
          })
        })
      )

    })


  })


})