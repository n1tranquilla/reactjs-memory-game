import React from 'react';

class Block extends React.Component {
    constructor(){
        super();
        this.state={
            hidden:true
        };
    }
    hide(){
        this.setState({hidden:true})
    }
    show(){
        this.setState({hidden:false})
    }
    peek(){
        this.props.pushSelection(this.props.value);
        this.show();
        if (!this.props.isDiscovered) setTimeout(()=>this.hide(),1000);
    }
    render() {
        return (
            <button className="square" onClick={()=> this.props.isDiscovered || this.peek()}>
                {!this.props.isDiscovered && this.state.hidden ? '?' : this.props.value}
            </button>
        );
    };
}

class Board extends React.Component {
    renderBlock(i) {
        const squares = this.props.blocks;
        const isDiscovered=this.props.discoveredNumbers.indexOf(squares[i]) > -1;
        return  <Block  value={squares[i]}
                        isDiscovered={isDiscovered}
                        pushSelection={this.props.pushSelection}
                />;
    }
    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderBlock(0)}
                    {this.renderBlock(1)}
                    {this.renderBlock(2)}
                    {this.renderBlock(3)}
                </div>
                <div className="board-row">
                    {this.renderBlock(4)}
                    {this.renderBlock(5)}
                    {this.renderBlock(6)}
                    {this.renderBlock(7)}
                </div>
                <div className="board-row">
                    {this.renderBlock(8)}
                    {this.renderBlock(9)}
                    {this.renderBlock(10)}
                    {this.renderBlock(11)}
                </div>
                <div className="board-row">
                    {this.renderBlock(12)}
                    {this.renderBlock(13)}
                    {this.renderBlock(14)}
                    {this.renderBlock(15)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            blocks:[...Array(16).keys()].map(x=>x%8),
            isPlayerOne:true,
            playerOneScore:0,
            playerTwoScore:0,
            selectionStack:[],
            discoveredNumbers:[]
        };
        shuffle(this.state.blocks)
    }
    pushSelection(val){
        this.state.selectionStack=this.state.selectionStack.concat(val);
        this.setState({selectionStack:this.state.selectionStack});
    }
    winner(){
        if (this.state.discoveredNumbers.length===8) {
            if (this.state.playerOneScore > this.state.playerTwoScore) return 1;
            if (this.state.playerOneScore < this.state.playerTwoScore) return 2;
            return -1;
        }
        return 0;
    }
    render() {
        /******************
         * Core Game logic
         ******************/
        if(this.state.selectionStack.length===2){
            if(this.state.selectionStack[0]===this.state.selectionStack[1]) {
                if (this.state.isPlayerOne) this.state.playerOneScore++;
                if (!this.state.isPlayerOne) this.state.playerTwoScore++;
                this.state.discoveredNumbers.push(this.state.selectionStack[0]);
            }
            this.state.selectionStack=[];
            this.state.isPlayerOne=!this.state.isPlayerOne;
        }

        const winner=this.winner();
        let status;
        if(winner){
            if(winner!==-1) status='Player '+winner+' wins!';
            else status='Tie game!';
        } else {
            const currentPlayer = this.state.isPlayerOne ? '1' : '2';
            status='Current Player: '+currentPlayer;
        }
        return (
            <div>
                <h1>Memory Game:</h1>
                <h2>Guess any two squares to find a pair. The player with the most pairs wins!</h2>
                <div className="game">
                    <div>
                        <Board blocks={this.state.blocks}
                               discoveredNumbers={this.state.discoveredNumbers}
                               pushSelection={this.pushSelection.bind(this)}
                        />
                    </div>
                    <div className="game-info">
                        <div>{status}</div>
                        <div>Player One: {this.state.playerOneScore}</div>
                        <div>Player Two: {this.state.playerTwoScore}</div>
                    </div>
                </div>
            </div>

        );
    }
}

function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

export default Game;