import Voting from "./Voting"
import React from 'react'
import ReactDOM from 'react-dom'
import { renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-dom/test-utils'
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
})