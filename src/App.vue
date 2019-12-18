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
  color: #257A62;
  height: 100vh;
  width: -webkit-fill-available;
  min-height: 600px;
}
</style>
