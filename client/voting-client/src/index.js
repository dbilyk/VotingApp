import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter, Route } from "react-router-dom"

import registerServiceWorker from './registerServiceWorker';

import Results from "./components/Results"
import Voting from './components/Voting'
import { env } from 'jsdom/lib/jsdom';


const pair = ["trainspot", "stuff"]

ReactDOM.render(
  <HashRouter ><App /></HashRouter>,
  document.getElementById('root')
);
registerServiceWorker();
