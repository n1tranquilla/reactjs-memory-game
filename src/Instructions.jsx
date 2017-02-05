import React from 'react';

class Instructions extends React.Component {
    render() {
        return (
            <div>
                <ol>
                    <li><p>Be the player who remembers the placement of numbers on the board</p></li>
                    <li><p>Each turn, a player has two clicks, which temporarily reveal the number underneath</p></li>
                    <li><p>Click one pair during a turn to get a point</p></li>
                    <li><p>The player with the most pairs (points) wins!</p></li>
                </ol>
            </div>
        );
    }
}

export default Instructions;