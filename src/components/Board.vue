<template >
  <div class="main-div">
    <header>
      <p>The Conway's game of life</p>
      <div class="header-menu">
        <button @click="die">Die!</button>
        <button @click="live">Live!</button> 
        <button @click="play">Play!</button> 
        <button @click="stop">Stop!</button>
      </div>
    </header>
    <div class="cell-container">
      <div class="cell-row" v-for="celldivs in cells" :key="celldivs.id">

        <div v-for="cell in celldivs" :class="'cell- cell-'+cell.state" 
        :key="cell.id" @click="changeState(cell)">
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Board",
  data() {
    return{
      cells: [

      ],
      playing: false,
      newState:[

      ]
    }
  },
  created() {
    for(let i = 0; i < 10; i++){
      let element = []
      for(let j = 0; j < 20; j++){
        let rand = Math.random();
        if(rand >= 0.65){
          element.push({ state:"live", neighbors: 0, row: i, column: j })
        }else{
          element.push({ state:"dead", neighbors: 0, row: i, column: j })
        }
      }
      this.cells.push(element)
    }
  },
  computed: {
  },
  methods: {
    die(){
      for(let i = 0; i < this.cells.length; i++){
        for(let j = 0; j < this.cells[i].length; j++){
            this.cells[i][j].state = "dead"
        }
      }
    },
    live() {
      for(let i = 0; i < this.cells.length; i++){
        for(let j = 0; j < this.cells[i].length; j++){
          this.cells[i][j].state = "live"
        }
      }
    },
    changeState(cell) {
      if(cell.state=="live"){
        cell.state="dead"
      }else{
        cell.state="live"
      }
    },
    play() {
      this.playing = true
      this.totalNeighbors()
    },
    stop(){
      this.playing = false
    },
    isAlive(pos){
      if(pos.state=="live"){
        return true
      }
    },
    calcNewState() {
      let nextState = this.cells
      for(let i = 0; i < nextState.length; i++) {
        for(let j = 0; j < nextState[i].length; j++) {
          //Rule 1: <2 neighbors = dead
          if(nextState[i][j].neighbors < 2 && nextState[i][j].state == "live")
          {nextState[i][j].state = "dead"}
          //Rule 2: 2 or 3 neighbors is OK
          //Rule 3 Overpopulation
          if(nextState[i][j].neighbors > 3 && nextState[i][j].state == "live")
          {nextState[i][j].state = "dead"}
          //Rule 4: Reproduction
          if(nextState[i][j].neighbors == 3 && nextState[i][j].state == "dead")
          {nextState[i][j].state  = "live"}
          nextState[i][j].neighbors = 0;
        }
      }
      this.cells = nextState
    },
    totalNeighbors(){
      if(this.playing == true){
        for(let i = 0; i < this.cells.length; i++){
          for(let t = 0; t < this.cells[i].length; t++){
            this.cells[i][t].neighbors = this.checkNeighbors(this.cells[i][t])
          }
        }
        this.calcNewState()
      }
    },
    checkNeighbors(cell) {
      
      let totalNeighbors = 0;
      let espCond = false

      // TOP AND BOTTOM
      if(cell.row==0 && cell.column != 0 && cell.column != this.cells[0].length-1){
        espCond = true
        // Same row
        if(this.isAlive(this.cells[cell.row][cell.column-1])){totalNeighbors++}
        if(this.isAlive(this.cells[cell.row][cell.column+1])){totalNeighbors++}
        // One down
        if(this.isAlive(this.cells[cell.row+1][cell.column-1])){totalNeighbors++}
        if(this.isAlive(this.cells[cell.row+1][cell.column])){totalNeighbors++}
        if(this.isAlive(this.cells[cell.row+1][cell.column+1])){totalNeighbors++}

      } else if(cell.row==this.cells.length-1 && cell.column != 0 && cell.column != this.cells[0].length-1){
        espCond = true
        // One up
        if(this.isAlive(this.cells[cell.row-1][cell.column-1])){totalNeighbors++}
        if(this.isAlive(this.cells[cell.row-1][cell.column])){totalNeighbors++}
        if(this.isAlive(this.cells[cell.row-1][cell.column+1])){totalNeighbors++}
        // Same row
        if(this.isAlive(this.cells[cell.row][cell.column-1])){totalNeighbors++}
        if(this.isAlive(this.cells[cell.row][cell.column+1])){totalNeighbors++}
      }

      // LEFT AND RIGHT
      if(cell.column==0 && cell.row != this.cells.length-1 && cell.row != 0){
        espCond = true
        // One up
        if(this.isAlive(this.cells[cell.row-1][cell.column])){totalNeighbors++}
        if(this.isAlive(this.cells[cell.row-1][cell.column+1])){totalNeighbors++}
        // Same row
        if(this.isAlive(this.cells[cell.row][cell.column+1])){totalNeighbors++}
        // One down
        if(this.isAlive(this.cells[cell.row+1][cell.column])){totalNeighbors++}
        if(this.isAlive(this.cells[cell.row+1][cell.column+1])){totalNeighbors++}

      } else if(cell.column==this.cells[0].length-1 && cell.row != this.cells.length-1  && cell.row != 0){
        espCond = true
        
        // One up
        if(this.isAlive(this.cells[cell.row-1][cell.column-1])){totalNeighbors++}
        if(this.isAlive(this.cells[cell.row-1][cell.column])){totalNeighbors++}
        // Same row
        if(this.isAlive(this.cells[cell.row][cell.column-1])){totalNeighbors++}
        // One down
        if(this.isAlive(this.cells[cell.row+1][cell.column-1])){totalNeighbors++}
        if(this.isAlive(this.cells[cell.row+1][cell.column])){totalNeighbors++}
      }

      // CORNERS
      if(cell.column==0 && cell.row==0){
        espCond = true
        // Same row
        if(this.isAlive(this.cells[cell.row][cell.column+1])){totalNeighbors++}
        // One down
        if(this.isAlive(this.cells[cell.row+1][cell.column])){totalNeighbors++}
        if(this.isAlive(this.cells[cell.row+1][cell.column+1])){totalNeighbors++}
      }
      if(cell.row==0 && cell.column==this.cells[0].length-1){
        espCond = true
        // Same row
        if(this.isAlive(this.cells[cell.row][cell.column-1])){totalNeighbors++}
        // One down
        if(this.isAlive(this.cells[cell.row+1][cell.column-1])){totalNeighbors++}
        if(this.isAlive(this.cells[cell.row+1][cell.column])){totalNeighbors++}
      }
      if(cell.row==this.cells.length - 1 && cell.column==0){
        espCond = true
        // One up
        if(this.isAlive(this.cells[cell.row-1][cell.column])){totalNeighbors++}
        if(this.isAlive(this.cells[cell.row-1][cell.column+1])){totalNeighbors++}
        // Same row
        if(this.isAlive(this.cells[cell.row][cell.column+1])){totalNeighbors++}
      }
      if(cell.row==this.cells.length-1 && cell.column==this.cells[0].length-1){
        espCond = true
        // One up
        if(this.isAlive(this.cells[cell.row-1][cell.column-1])){totalNeighbors++}
        if(this.isAlive(this.cells[cell.row-1][cell.column])){totalNeighbors++}
        // Same row
        if(this.isAlive(this.cells[cell.row][cell.column-1])){totalNeighbors++}
      }

      if(espCond){
        return totalNeighbors
      }else {
        // One up
        if(this.isAlive(this.cells[cell.row-1][cell.column-1])){totalNeighbors++}
        if(this.isAlive(this.cells[cell.row-1][cell.column])){totalNeighbors++}
        if(this.isAlive(this.cells[cell.row-1][cell.column+1])){totalNeighbors++}
        // Same row
        if(this.isAlive(this.cells[cell.row][cell.column-1])){totalNeighbors++}
        if(this.isAlive(this.cells[cell.row][cell.column+1])){totalNeighbors++}
        // One down
        if(this.isAlive(this.cells[cell.row+1][cell.column-1])){totalNeighbors++}
        if(this.isAlive(this.cells[cell.row+1][cell.column])){totalNeighbors++}
        if(this.isAlive(this.cells[cell.row+1][cell.column+1])){totalNeighbors++}
      }
      return totalNeighbors

    }
  }, 
}
</script>

<style lang="css" scoped>
  @import './comStyle.css'
</style>
