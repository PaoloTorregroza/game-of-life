<template >
  <div class="main-div">
    <header>
      <p>The Conway's game of life</p>
      <div class="header-menu">
        <button @click="play">Play</button>
        <button @click="stop">Stop</button>
      </div>
    </header>
    <div class="mainGrid">
      <table class="board">
        <tbody>
          <tr v-for="row in cells" :key="row.id">
            <td :class="'cell-'+cell.state" v-for="cell in row" :key="cell.id"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>{{ indexOfActuallState }}</p>
  </div>
</template>

<script>
import {countNeighbors, rulesAply} from '../algoritms/lifeAlgo.js'

export default{
  name: "Board",
  data(){
    return{
      cells: [
        
      ],
      nextStates: [

      ],
      steps: 10,
      indexOfActuallState: 0,
    }
  },
  created(){
    for(let i = 0; i < 24; i++){
      this.cells.push([])
      for(let j = 0; j < 60; j++){
        let state = Math.random()
        if(state > .8){
          this.cells[i].push({state: 1, row: i, col: j})
        }else {
          this.cells[i].push({state: 0, row: i, col: j})
        }
      }
    }   
  },
  methods: {
    stop(){
      clearInterval(this.$options.interval)
    },
    play() {
      this.indexOfActuallState =0 
      let board = this.cells //Actuall board
      let newBoards = []//Array of all the boards
      let cellNeighbors //Save the number of neighbors of x cell
      let rowOfCells = [] // An array whit a row of cells

      for(let n = 0; n < this.steps; n++)
      {
        newBoards.push([])
        for(let i = 0; i < board.length; i++)
        {
           //A new cell to push into an array    
          for(let j = 0; j < board[i].length; j++)
          {  
            const newCell = {state: 0, row: i, col: j}

            cellNeighbors = countNeighbors(i, j, board)
            
            // Apply rules to cell
            newCell.state = rulesAply(cellNeighbors, board[i][j].state)
            // Add new cells to an array
            rowOfCells.push(newCell)
            // Set timeout for make a steps animation of every state in the array
          }
          newBoards[n].push(rowOfCells)
          rowOfCells = []
        }
      }
      this.nextStates = newBoards
      this.$options.interval = setInterval(this.nextSteps, 1000)

    },
    nextSteps(){
      if(this.indexOfActuallState == this.steps-1){        
        clearInterval(this.$options.interval)
      }
      this.cells = this.nextStates[this.indexOfActuallState]
      console.log(this.cells == this.nextStates[this.indexOfActuallState])
      this.indexOfActuallState++  
    },
  }
}
</script>

<style lang="css" scoped>
  @import './comStyle.css'
</style>
