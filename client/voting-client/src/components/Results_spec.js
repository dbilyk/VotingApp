import { expect } from 'chai'
import React from 'react'
import ReactDOM from 'react-dom'
import { List, Map } from "immutable"
import Results from "./Results"
import { renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, Simulate } from "react-dom/test-utils"


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

  it("invokes the next callback when next button is clicked", () => {
    let nextInvoked = false
    let next = () => { nextInvoked = true }
    const pair = List.of("1", "2")

    const component = renderIntoDocument(
      <Results
        pair={pair}
        tally={Map()}
        next={next}
      />
    )
    Simulate.click(ReactDOM.findDOMNode(component.refs.next))

    expect(nextInvoked).to.eq(true)


  })

  it("renders winner when there is one", () => {
    const component = renderIntoDocument(
      <Results
        winner="trainspot"
        pair={List.of("trainspot", "stuff")}
        tally={Map()} />
    )

    let result = ReactDOM.findDOMNode(component.refs.winner)
    expect(result).to.be.ok
    expect(result.textContent).to.contain("trainspot")

  })

})