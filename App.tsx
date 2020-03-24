import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Button,
} from "react-native";

function Square(props) {
  return (
    <TouchableOpacity style = {styles.square} 
      onPress = {props.onPress}>
        {props.value}
      </TouchableOpacity>
  );
}



class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if(calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]} 
        onPress={() => this.handleClick(i)}
        />
      );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = <View><Text>Winner: {winner} </Text></View>;
    }
    else {
      status = <View><Text>Next player: {this.state.xIsNext ? "X" : "O"} </Text></View>
    }

    return (
      <View>
        <View style={styles.status}>
          <Text>{status}</Text>
        </View>
        <View style={styles.boardRow}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </View>
        <View style={styles.boardRow}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </View>
        <View style={styles.boardRow}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </View>
      </View>
    );
  }
}

export default class Game extends React.Component {
  render() {
    return (
      <View style={styles.game}>
        <View style={styles.gameBoard}>
          <Board />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  square: {
    borderWidth: 1,
    height: 50,
    marginRight: -1,
    marginTop: -1,
    padding: 0,
    width: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  status: {
    marginBottom: 10
  },
  boardRow: {
    flexDirection: "row"
  },
  game: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 300
  },
  gameInfo: {
    marginLeft: 20
  },
  gameBoard: {
    flexDirection: "row"
  }
});

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
