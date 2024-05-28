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
    HelloWorld
  },
  data() {
    return {
      items: []
    };
  },
  methods: {
    loadThings() {
      const baseURL = process.env.VUE_APP_BACKEND_BASE_URL; // Verwende die korrekte Umgebungsvariable
      const endpoint = baseURL + '/hello'; // Stelle sicher, dass der Endpoint korrekt ist
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      fetch(endpoint, requestOptions)
          .then(response => response.json())
          .then(result => {
            result.forEach(thing => {
              this.items.push(thing);
            });
          })
          .catch(error => console.log('error', error));
    }
  },
  created() {
    this.loadThings(); // Rufe die Methode auf, wenn die Komponente erstellt wird
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
