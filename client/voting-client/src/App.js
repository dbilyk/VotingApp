import React, { Component } from 'react';
import { List, Map } from "immutable"
import { Route } from "react-router-dom"
import Results from "./components/Results"
import Voting from "./components/Voting"

import './App.css';
const pair = List.of('trainspot', "stuff")
const tally = new Map({ "trainspot": 3, "stuff": 2 })

class App extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/results" component={() =>
          <Results pair={pair} tally={tally} />
        } />
        <Route exact path="/" render={() => <Voting pair={pair} tally={tally} />} />
      </div>
    )
  }
}

export default App;
