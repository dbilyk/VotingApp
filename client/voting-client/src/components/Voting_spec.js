import Voting from "./Voting"
import Winner from './Winner'
import Vote from './Vote'

import { List } from 'immutable'
import React, { createElement } from 'react'
import ReactDOM from 'react-dom'
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-dom/test-utils'
import { expect } from "chai"

console.log('here')
describe('Voting', () => {
  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(<Voting pair={["trainspot", "stuff"]} />)

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button')
    expect(buttons.length).to.eq(2)
    expect(buttons[0].textContent).to.eq("trainspot")
    expect(buttons[1].textContent).to.eq("stuff")

  })

  it('invokes callback when a button is clicked', () => {
    let votedWith
    const vote = (entry) => { votedWith = entry }

    const component = renderIntoDocument(<Voting pair={["1", '2']} vote={vote} />)
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button')
    Simulate.click(buttons[0])

    expect(votedWith).to.eq('1')
  })

  it('disables buttons when user has voted', () => {
    const component = renderIntoDocument(<Voting pair={["trainspot", "other"]} hasVoted="traninspot" />)
    const buttons = scryRenderedDOMComponentsWithTag(component, "button")

    expect(buttons.length).to.eq(2)
    expect(buttons[0].hasAttribute('disabled')).to.eq(true)
    expect(buttons[1].hasAttribute('disabled')).to.eq(true)

  })

  it('adds label to the voted entry', () => {
    const component = renderIntoDocument(
      <Voting
        pair={["trainspot", "stuff"]}
        hasVoted="trainspot"
      />
    )

    let buttons = scryRenderedDOMComponentsWithTag(component, 'button')

    expect(buttons[0].textContent).to.contain("Voted")

  })
  it("renders just the winner when there is one", () => {
    const component = renderIntoDocument(
      <Voting winner="trainspotting" />
    )
    const buttons = scryRenderedDOMComponentsWithTag(component, "button")
    const winner = ReactDOM.findDOMNode(component.refs.winner)

    expect(buttons.length).to.eq(0)
    expect(winner).to.be.ok
    expect(winner.textContent).to.contain("trainspotting")

  })
  it("renders as a pure component", () => {
    const pair = ["trainspot", "stuff"]
    const container = document.createElement('div')
    let component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    )
    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0]
    expect(firstButton.textContent).to.eq("trainspot")

    pair[0] = "mutated"
    component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    )
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0]
    expect(firstButton.textContent).to.eq("trainspot")
  })
  it("does update DOM when prop changes", () => {
    const pair = List.of("trainspot", "stuff")
    const container = document.createElement("div")
    let component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    )
    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0]
    expect(firstButton.textContent).to.eq("trainspot")

    const newPair = pair.set(0, "1")
    component = ReactDOM.render(
      <Voting pair={newPair} />,
      container
    )

    firstButton = scryRenderedDOMComponentsWithTag(component, "button")[0]

    expect(firstButton.textContent).to.eq("1")

  })
})
