/**
 * Created by batmah on 16.10.16.
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput
} from 'react-native';

import CalculateWinner from './CalculateWinner';



const style = StyleSheet.create({
    status: {
    marginBottom: 10,
},
    square: {
        margin:10,
    backgroundColor: 'yellow',
    borderRadius: 10,
    height: 70,
    alignItems: 'center',
    width: 70,
        flexDirection: 'column',

},
    game: {
    flexDirection: 'row',
},

   gameInfo: {
    marginTop: 20,
},
    boardRow: {
        flexDirection: 'row',
}


});
//---------------------------------------
const Square = (props)=>(
    <TouchableOpacity onPress={ ()=>props.onClick }>
    <View style={style.square}>
    <Text style={{color:'black'}}>{props.value}</Text>
    </View>
    </TouchableOpacity>
);



//---------------------------------
class Board extends Component {

  renderSquare(i) {
    return <Square value={this.props.squares[i]}
       onClick={() => this.props.onClick(i)} />;
  }

  render() {

    return (
        <View style={{marginTop:50, justifyContent: 'center', alignItems:'center'}}>

        <View style={style.boardRow}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </View>
        <View style={style.boardRow}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </View>
        <View style={style.boardRow}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </View>
      </View>
    );
  }
}


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
              <View style={style.gameInfo}>
                  <View><Text>{status}</Text></View>
                  <View><TouchableOpacity onPress={ () => this.setState({squares: Array(9).fill(null), NextPlayer: 1}) }>
                      <Text>Начать игру</Text></TouchableOpacity>
                  </View>
              </View>
          );
      }
      else if (this.state.squares.indexOf(null)===-1 && winner === null ){
          status = "Ничья";
          return (
              <View style={style.gameInfo}>
                  <View style={style.status}><Text>{status}</Text></View>
                  <View><Text>Если будет 3и ничьи подряд, каждому игроку нужно будет оплатить штраф :-)</Text></View>
                  <View>
                  <TouchableOpacity onPress={ () => this.setState({squares: Array(9).fill(null), NextPlayer: 1}) }>
                      <Text>Начать игру</Text></TouchableOpacity>
                  </View>
              </View>
          );
      }else {
          status = "Сейчас играет: " + (this.state.NextPlayer === 1 ? "X" : "O");
          return (
              <View style={style.game}>
                  <View>
                      <Board
                          squares={curr_squares}
                          onClick={i => this.clickHandle(i)}
                      />
                  </View>
                  <View style={style.gameInfo}>
                      <View><Text>{status}</Text></View>
                  </View>
              </View>
          );
      }
  }
}



export default App;