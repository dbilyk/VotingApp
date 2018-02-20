import { List, Map, fromJS } from "immutable"

export const INITIAL_STATE = Map()
//sets the initial entries list
export function setEntries(state, entries) {
  return state.set('entries', List(entries))
}

//local function to calc winners of a given tally
function getWinners(vote) {
  if (!vote) return []
  const [a, b] = vote.get("pair")
  const aVotes = vote.getIn(["tally", a], 0)
  const bVotes = vote.getIn(["tally", b], 0)

  if (aVotes > bVotes) return a
  else if (aVotes < bVotes) return b
  else return [a, b]

}

//takes top two entries and puts em to a vote
export function next(state) {
  const entries = state.get("entries")
    .concat(getWinners(state.get("vote")))

  if (entries.size == 1) {
    return state.remove("vote")
      .remove("entries")
      .set("winner", entries.first())

  }

  return state.merge({
    vote: Map({ pair: entries.take(2) }),
    entries: entries.skip(2)
  })

}

export function vote(state, item) {
  return state.updateIn(["tally", item], 0, value => value + 1)

}