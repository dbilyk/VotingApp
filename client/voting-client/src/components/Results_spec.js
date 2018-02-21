import { expect } from 'chai'
import React from 'react'
import { List, Map } from "immutable"
import Results from "./Results"
import { renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass } from "react-dom/test-utils"


describe("Results", () => {
  it("renders entries with votecount or zero", () => {
    const pair = List.of('1', '2')
    const tally = Map({ '1': 4 })
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
    )

    const entries = scryRenderedDOMComponentsWithClass(component, 'entry')
    const [one, two] = entries.map(val => val.textContent)

    expect(entries.length).to.eq(2)
    expect(one).to.contain("1")
    expect(one).to.contain("4")

    expect(two).to.contain("2")
    expect(two).to.contain("0")

  })

})