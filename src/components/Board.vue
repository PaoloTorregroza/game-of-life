<template >
  <div class="main-div">
    <header>
      <p>The Conway's game of life</p>
      <div>
        <p>Speed(ms)
        <input class="speed-input" v-model="updateTime" type="number">
        </p>
      </div>
      <div class="header-menu">
        <button @click="play">Play</button>
        <button @click="stop">Stop</button>
        <button @click="generateRandomBoard">Random board</button>
        <button @click="clearLive">Live!</button>
        <button @click="clearDead">Die!</button>
      </div>
    </header>
    <div class="mainGrid">
      <table class="board">
        <tbody>
          <tr v-for="row in board" :key="row.id">
            <td @click="changeState(cell)" :class="'cell-'+cell.state" v-for="cell in row" :key="cell.id">
              </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {countNeighbors, rulesAply} from '../algoritms/lifeAlgo.js'

export default{
  name: "Board",
  data(){
    return{
      board: [
        
      ],
      playing: false,
      updateTime: 80,
    }
  },
  created(){
    this.generateFirstBoard();  
  },
  
  methods: {
    generateFirstBoard(){
      for(let i = 0; i < 24; i++){
        this.board.push([])
        for(let j = 0; j < 60; j++){
          let state = Math.random()
          if(state > .8){
            this.board[i].push({state: 1, row: i, col: j})
          }else {
            this.board[i].push({state: 0, row: i, col: j})
          }
        }
      } 
    },
    stop(){
      this.playing = false
    },
    play(){
      this.playing = !this.playing
      setTimeout(this.intervals(), 1000)
    },
    intervals() {
      if(this.playing){
        this.generateNewBoard()
        setTimeout(this.intervals, this.updateTime)
      }
    },
    generateRandomBoard() {
      let newBoard = []
      for(let i = 0; i < 24; i++){
        newBoard.push([])
        for(let j = 0; j < 60; j++){
          let state = Math.random()
          if(state > .8){
            newBoard[i].push({state: 1, row: i, col: j})
          }else {
            newBoard[i].push({state: 0, row: i, col: j})
          }
        }
      } 
      this.board = newBoard 
    },
    generateNewBoard(){
      const nextBoard = this.nextBoard()

      for(let i = 0; i < nextBoard.length; i++){
        for(let j = 0; j < nextBoard[i].length; j++){
          let cell_neighbors = countNeighbors(i, j, this.board)
          let cell_state = rulesAply(cell_neighbors, this.board[i][j].state)

          let cell = {
            state: cell_state,
            row: i,
            col: j,
          }

          nextBoard[i][j] = cell
        }
      }
      this.board = nextBoard
    },
    nextBoard() {
      const newGrid = []
            for (let i = 0; i < this.board.length; i++) {
                newGrid[i] = []
                for (let j = 0; j < this.board[i].length; j++) {
                    newGrid[i][j] = this.board[i][j]
                }
            }

            return newGrid;
    },
    clearLive(){
      for(let i = 0; i < this.board.length; i++){
        for(let j = 0; j < this.board[i].length; j++){
          this.board[i][j].state = 1
        }
      }
    },
    clearDead(){
      for(let i = 0; i < this.board.length; i++){
        for(let j = 0; j < this.board[i].length; j++){
          this.board[i][j].state = 0
        }
      }
    },
    changeState(cell) {
      cell.state = cell.state == 1? 0 : 1
    }
  },
}
</script>

<style lang="css" scoped>
  @import './comStyle.css'
</style>
