<template>
  <div id="app">
    
    <Board/>
  </div>
</template>

<script>

import Board from './components/Board.vue'

export default {
  name: 'app',
  components: {
    Board
  },
  methods: {
    
  }
}
</script>

<style>
#app {
  position: absolute;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100vw;
  height: 100vh;
  min-height: 600px;
}
</style>
