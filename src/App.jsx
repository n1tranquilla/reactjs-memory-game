import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Memory Match</h1>
                <div>
                    <ul>
                        <li><Link to="/game">Game</Link></li>
                        <li><Link to="/instructions">Instructions</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;