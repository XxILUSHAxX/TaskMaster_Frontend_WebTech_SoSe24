<template>
  <div class="board">
    <Column title="Todo" :items="todoItems" @add-item="addItem" @update-items="updateItems" />
    <Column title="Doing" :items="doingItems" @update-items="updateItems" />
    <Column title="Done" :items="doneItems" @update-items="updateItems" />
  </div>
</template>

<script>
import { ref } from 'vue';
import Column from '../components/ColumnTable.vue';

export default {
  name: 'HomePage',
  components: { Column },
  setup() {
    const todoItems = ref(['Item 1', 'Item 2']);
    const doingItems = ref(['Item 3']);
    const doneItems = ref(['Item 4']);

    const addItem = (item) => {
      todoItems.value.push(item);
    };

    const updateItems = ({ item, from, to }) => {
      switch (`${from}-${to}`) {
        case 'todo-doing':
          moveTodoToDoing(item);
          break;
        case 'doing-todo':
          moveDoingToTodo(item);
          break;
        case 'doing-done':
          moveDoingToDone(item);
          break;
        case 'todo-done':
          moveTodoToDone(item);
          break;
        default:
          break;
      }
    };

    const moveTodoToDoing = (item) => {
      const index = todoItems.value.indexOf(item);
      if (index > -1) {
        todoItems.value.splice(index, 1);
        doingItems.value.push(item);
      }
    };

    const moveDoingToTodo = (item) => {
      const index = doingItems.value.indexOf(item);
      if (index > -1) {
        doingItems.value.splice(index, 1);
        todoItems.value.push(item);
      }
    };

    const moveDoingToDone = (item) => {
      const index = doingItems.value.indexOf(item);
      if (index > -1) {
        doingItems.value.splice(index, 1);
        doneItems.value.push(item);
      }
    };

    const moveTodoToDone = (item) => {
      const index = todoItems.value.indexOf(item);
      if (index > -1) {
        todoItems.value.splice(index, 1);
        doneItems.value.push(item);
      }
    };

    return { todoItems, doingItems, doneItems, addItem, updateItems };
  },
};
</script>

<style scoped>
.board {
  display: flex;
  gap: 16px;
  padding: 20px;
}
</style>
