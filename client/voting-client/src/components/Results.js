import React from "react"
import Winner from "./Winner"

export default class Results extends React.PureComponent {
  constructor(props) {
    super(props)
    this.getPair = this.getPair.bind(this)
  }

  getPair() {
    return this.props.pair || []
  }

  getVotes(entry) {
    if (this.props.tally && this.props.tally.has(entry)) {
      return this.props.tally.get(entry)
    }
    return 0
  }

  resultsJSX() {
    return (
      <div className="results">
        <div className="tally">
          {
            this.getPair().map(val =>
              <div key={val} className="entry">
                <h1>{val}</h1>
                <div className="voteCount">
                  {this.getVotes(val)}
                </div>
              </div>
            )
          }
        </div>
        <div className='management'>
          <button
            ref='next'
            className="next"
            onClick={() => this.props.next()} >
            Next
          </button>
        </div>
      </div>
    )
  }

  render() {
    if (this.props.winner) {
      return (
        <Winner
          ref="winner"
          winner={this.props.winner}
        />
      )
    }
    else {
      return (
        this.resultsJSX()
      )

    }
  }


}