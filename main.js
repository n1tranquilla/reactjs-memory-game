import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import App from './src/App.jsx';
import Game from './src/Game.jsx';
import Instructions from './src/Instructions.jsx';

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
        <Route path="/game" component={Game}/>
        <Route path="/instructions" component={Instructions}/>
    </Router>
), document.getElementById('app'))



