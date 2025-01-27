import { Component } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import params from './src/param';
import Field from './src/components/Filed';
import MineField from './src/components/MineField';
import { cloneBoard, createMinedBoard, flagsUsed, hadExplosion, invertFlag, openField, showMines, wonGame } from './src/functions';
import Header from './src/components/Header';
import LevelSelection from './src/screens/LevelSelection';

export default class App extends Component {

  constructor(props: any) {
    super(props)
    this.state = this.createState()
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false,
    }
  }

  onOpenField = (row: number, column: number) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const won = wonGame(board)
    const lost = hadExplosion(board)

    if (lost) {
      showMines(board)
      Alert.alert('Perdeeeeu!', 'Que burro!')
    }

    if (won) {
      Alert.alert('Parabéns', 'Você venceu!')
    }

    this.setState({ board, lost, won })
  }

  onSelectField = (row: number, column: number) => {
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    const won = wonGame(board)

    if (won) {
      Alert.alert('Parabéns', 'Você venceu!')
    }

    this.setState({ board, won })
  }

  onLevelSelected = (level: number) => {
    params.difficultLevel = level
    this.setState(this.createState())
  }

  render() {
    return (
      // <MineField />
      <View style={styles.container}>
        <LevelSelection 
          isVisible={this.state.showLevelSelection} 
          onLevelSelected={this.onLevelSelected} 
          onCancel={() => this.setState({ showLevelSelection: false})}/>
        <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
          onNewGame={() => this.setState(this.createState())}
          onFlagPress={() => this.setState({ showLevelSelection: true})}
        />
        <View style={styles.board}>
          <MineField board={this.state.board}
            onOpenField={this.onOpenField} 
            onSelectField={this.onSelectField} 
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  },


});
