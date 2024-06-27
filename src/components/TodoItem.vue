<template>
  <div class="todo-item">
    {{ content }}
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    content: String,
  },
};
</script>

<style scoped>
.todo-item {
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
</style>
