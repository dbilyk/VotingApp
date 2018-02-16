import { expect } from "chai"
import { List, Map } from "immutable"
describe("immutability", () => {
  describe("a tree", () => {
    function addMovie(currentState, movie) {
      return currentState.update("movies", movies => movies.push(movie))
    }

    it("is immutable", () => {
      let state = Map({ movies: List.of('1', '2', '3') })
      let nextState = addMovie(state, "4")

      expect(state).to.equal(Map({ "movies": List.of('1', '2', '3') }, "state = " + state))
      expect(nextState).to.equal(Map({ "movies": List.of('1', '2', '3', "4") }))

    })

  })


  describe("A List", () => {
    function addMovie(currentState, movie) {
      return currentState.push(movie)
    }

    it("is immutable", () => {
      let state = List.of("trainspotting", "127 days later")
      let nextState = addMovie(state, "somemovie")

      expect(nextState).to.equal(
        List.of(
          'trainspotting',
          "127 days later",
          "somemovie"
        )
      )

      expect(state).to.equal(
        List.of(
          "trainspotting",
          "127 days later"
        )
      )

    })

  })

  describe("a number", () => {
    function increment(currentState) {
      return currentState + 1
    }

    it("is immutable", () => {
      let state = 42
      let nextState = increment(state)

      expect(nextState).to.equal(43)
      expect(state).to.equal(42)
    })
  })


})