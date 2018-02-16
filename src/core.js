import { List, Map } from "immutable"

//sets the initial entries list
export function setEntries(state, entries) {
  return state.set('entries', List(entries))
}

//takes top two entries and puts em to a vote
export function next(state) {
  const entries = state.get("entries")

  return state.merge({
    vote: Map({ pair: entries.take(2) }),
    entries: entries.skip(2)
  })

}

export function vote() {
  //unimplemented
}