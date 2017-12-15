/**
 * Created by batmah on 16.10.16.
 */
import React, {Component} from 'react';


const Square = (props)=>(
 <button className="square" onClick={ props.onClick }> { props.value } </button>
);

Square.propTypes = {
  onClick: React.PropTypes.func.isRequired
};

class Board extends Component {

  renderSquare(i) {
    return <Square value={this.props.squares[i]}
       onClick={() => this.props.onClick(i)} />;
  }

  render() {
 //   const status = 'Next player: X';

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

class App extends Component {

 constructor() {
    super();
    // Устанавливаем первоночльное состояние this.state.history - пустой масив с 9 элементами null,
    // this.state.stepNumber - номер шага и this.state.xIsNext - true или false для определения кто следующий делает ход
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      stepNumber: 0,
      xIsNext: true
    };
  }

   // Слушател событий принимает номер клетки, выполняются действия
    // и вычичления, при клике по любой из неактивированых клеток
    handleClick(i) {
      // Копируем! в history массив с объектом созданный из текущего состояние this.state.history
      // (от начал массива до номера текущего хода)
      const history = this.state.history.slice( 0, this.state.stepNumber + 1 );
      // Записываем в current объект над которым производится работа извлекая его из массива
      const current = history[history.length - 1];
      // Копируем! в squares массив отмеченых и пустых клеток
      const squares = current.squares.slice();

      // Если текущий массив содержит выигрышную комбинацию выходим из обработки события
      if (calculateWinner(squares) || squares[i]) {
        return;
      }

      // В зависимости от того чей ход передаем для заполнения поля в массиве squares буквами X или O
      squares[i] = this.state.xIsNext ? "X" : "O";

      // Добавлем в this.state.history объект с массивом содержащим последнее состояние игрового поля
      // обновляем значение this.state.stepNumber прописывая номер текущего хода
      // передаем ход следующему игроку записывая в this.state.xIsNext - true или false
      this.setState({
        history: history.concat([
          { squares: squares }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
    }

     jumpTo(step) {
        // Принимает номер шага в игре на который надо перейти и меняет значения
        // в this.state.stepNumber и this.state.xIsNext
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0 // true или false
        });
      }



  render() {
      // Записываем в переменную history историю игры на данный момент
      const history = this.state.history;
      // Записываем в переменную current объект над которым производится работа извлекая его из массива history
      const current = history[this.state.stepNumber];
      // Записываем в переменную winner результат определения победителя на основе текущего состояния игры
      const winner = calculateWinner(current.squares); // X, O или null

      // Записываем в переменную moves резултат работы метода map() который перебирая элементы в массиве history
      // Позволяет сформировать список ходов, move представляет собой номер шага в игре
      const moves = history.map((step, move) => {
          const desc = move ? "Ход №" + move : "Начать игру";
          return (
              <li key={ move }>
                  <a href="#" onClick={ () => this.jumpTo(move) }> { desc } </a>
              </li>
          );
      });

      // Записываем в переменную status строку с информацией о текущем состоянии игры
      // Сообщаем кто сейчас играет или кто победил или ничья
      let status;
      if (winner) {
          status = "Победитель: " + winner;
      } else if (this.state.stepNumber === 9 && winner === null ){
          status = "Игровая Ничья";
      } else {
          status = "Сейчас играет: " + ( this.state.xIsNext ? "X" : "O" );
      }

      return (
      <div className="game">
        <div className="game-board">
          <Board
           squares={ current.squares }
           onClick={ i => this.handleClick(i) }
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
// Функция выигрышных комбинаций
// ========================================
function calculateWinner(squares) {
 // в массиве собраны все выигрышные компбинации
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // сравниваем комбинации из активированных клеток с выигрышными комбинациями
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;

}

export default App;