<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name +' '+ item.test}}
      </li>
    </ul>


  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      items: [
        {id: 1, name: 'Item 1', test: 'JA'},
        {id: 2, name: 'Item 2', test: 'vllt'},
        {id: 3, name: 'Item 3', test: 'nein'}
      ]
    };
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
