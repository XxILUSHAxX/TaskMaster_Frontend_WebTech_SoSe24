<template>
  <div id="app">
    <h1>Todo List</h1>
    <Home />
  </div>
</template>

<script>
import Home from './views/HomePage.vue';

export default {
  name: 'App',
  components: {
    Home
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>