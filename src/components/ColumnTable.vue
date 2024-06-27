<template>
  <div class="column">
    <h2>{{ title }}</h2>
    <div class="task-list">
      <div v-for="(item, index) in items" :key="index" class="todo-item">
        <div class="todo-item-content">
          <p>{{ item }}</p>
        </div>
        <div class="todo-item-actions">
          <div v-if="title === 'Todo'">
            <button @click="moveToDoing(item)">Doing</button>
            <button @click="moveToDone(item)">Done</button>
          </div>
          <div v-else-if="title === 'Doing'">
            <button @click="moveToTodo(item)">Todo</button>
            <button @click="moveDoingToDone(item)">Done</button>
          </div>
          <div v-else>
            <button disabled>Done</button>
          </div>
        </div>
      </div>
    </div>
    <input v-if="isTodo" v-model="newItem" @keyup.enter="addNewItem" placeholder="Add new item" />
  </div>
</template>

<script>
import {ref} from 'vue';

export default {
  name: 'ColumnTable',
  props: {
    title: String,
    items: Array,
  },
  emits: ['add-item', 'update-items'],
  setup(props, {emit}) {
    const newItem = ref('');

    const addNewItem = () => {
      if (newItem.value.trim()) {
        emit('add-item', newItem.value.trim());
        newItem.value = '';
      }
    };

    const moveToDoing = (item) => {
      emit('update-items', {item, from: 'todo', to: 'doing'});
    };

    const moveToTodo = (item) => {
      emit('update-items', {item, from: 'doing', to: 'todo'});
    };

    const moveDoingToDone = (item) => {
      emit('update-items', {item, from: 'doing', to: 'done'});
    };

    const moveToDone = (item) => {
      emit('update-items', {item, from: 'todo', to: 'done'});
    };

    const isTodo = props.title === 'Todo';

    return {newItem, addNewItem, moveToDoing, moveToTodo, moveDoingToDone, moveToDone, isTodo};
  },
};
</script>

<style scoped>
.column {
  border: 1px solid #ccc;
  padding: 16px;
  width: 30%;
  border-radius: 8px;
  background-color: #fff;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
  align-items: center;
}

.todo-item {
  display: flex;
  flex-direction: column; /* Stack items vertically */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.2s;
  max-width: 240px; /* Adjust this value to ensure it fits approximately 50 characters */
}

.todo-item:hover {
  background-color: #ececec;
}

.todo-item-content {
  padding: 10px;
}

.todo-item-actions {
  display: flex;
  justify-content: center;
}

input {
  margin-top: 8px;
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin-left: 8px;
}
</style>
