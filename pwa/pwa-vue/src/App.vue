<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld :msg="announce" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  data() {
    return {
      announce: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    HelloWorld
  },
  mounted() {
    fetch('http://127.0.0.1:3333/pwa-vue-demo')
      .then(resp => resp.json())
      .then(resp => {
        this.announce = resp.announce
      })
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
