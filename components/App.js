/**
 * Created by batmah on 16.10.16.
 */
import React, {Component} from 'react';
import CalculateWinner from './CalculateWinner';

//---------------------------------------
const Square = (props)=>(
 <button className="square" onClick={ props.onClick }> { props.value } </button>
);

Square.propTypes = {
  onClick: React.PropTypes.func.isRequired
};

//---------------------------------
class Board extends Component {

  renderSquare(i) {
    return <Square value={this.props.squares[i]}
       onClick={() => this.props.onClick(i)} />;
  }

  render() {

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

Board.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    squares: React.PropTypes.array.isRequired
};

//----------------------------------------

class App extends Component {

 constructor() {
    super();

    this.state = {
      squares: Array(9).fill(null),
      NextPlayer: 1
    };

  //  this.clickHandle=this.clickHandle.bind(this);

  }


    clickHandle(i) {
     const curr_squares = this.state.squares.slice();

      if (CalculateWinner(curr_squares) || curr_squares[i]) {
        return;
      }

      curr_squares[i] = this.state.NextPlayer===1 ? "X" : "O";

      this.setState({
      squares:curr_squares,
      NextPlayer: this.state.NextPlayer===1?0:1
      });
    }


  render() {

      const curr_squares = this.state.squares.slice();
      const winner = CalculateWinner(curr_squares); // X, O или null

      let status;
      if (winner) {
          status = "Победитель: " + winner;
          return (
              <div className="game-info">
                  <div>{status}</div>
                  <a href="#" onClick={ () => this.setState({squares: Array(9).fill(null), NextPlayer: 1}) }>
                      Начать игру </a>
              </div>
          );
      }
      else if (this.state.squares.indexOf(null)===-1 && winner === null ){
          status = "Ничья";
          return (
              <div className="game-info">
                  <div>{status}</div>
                  <div>Если будет 3и ничьи подряд, каждому игроку нужно будет оплатить штраф :-)</div>
                  <a href="#" onClick={ () => this.setState({squares: Array(9).fill(null), NextPlayer: 1}) }>
                     Начать игру </a>
              </div>
          );
      }else {
          status = "Сейчас играет: " + (this.state.NextPlayer === 1 ? "X" : "O");
          return (
              <div className="game">
                  <div className="game-board">
                      <Board
                          squares={curr_squares}
                          onClick={i => this.clickHandle(i)}
                      />
                  </div>
                  <div className="game-info">
                      <div>{status}</div>
                  </div>
              </div>
          );
      }
  }
}



export default App;