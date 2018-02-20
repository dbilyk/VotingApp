import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import Voting from './components/Voting'
import { env } from 'jsdom/lib/jsdom';


const pair = ["trainspot", "stuff"]
ReactDOM.render(<Voting pair={pair} />,
  document.getElementById('root'));
registerServiceWorker();
