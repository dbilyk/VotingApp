import { setEntries, next, vote } from "./core"

export function reducer(state, action) {
  switch (action.type) {
    case "SET_ENTRIES":
      return setEntries(state, action.entries)
    case "VOTE":
      return vote(state, action.entry)
    case "NEXT":
      return next(state)
  }
  return state;

}
