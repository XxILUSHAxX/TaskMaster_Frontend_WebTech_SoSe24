<template>
  <HomePage msg="Welcome to Your Vue.js App"/>
  <div id="app">
    <hello-world></hello-world>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import HomePage from "@/components/HomePage.vue";

export default {
  name: 'App',
  components: {
    HomePage,
    HelloWorld,

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 100px;
}
html, body {
  background-color: #dcdcdc; /* Helles Grau */
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
