<template>
  <div class="board">
    <Column title="To-Do" :items="todoItems" @add-item="addItem" @update-items="updateItems" @delete-item="deleteTask" @edit-item="editTask" @update-priority="updatePriority" />
    <Column title="Doing" :items="doingItems" @update-items="updateItems" @delete-item="deleteTask" @edit-item="editTask" @update-priority="updatePriority" />
    <Column title="Done" :items="doneItems" @update-items="updateItems" @delete-item="deleteTask" @edit-item="editTask" />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import Column from '../components/ColumnTable.vue';

export default {
  name: 'HomePage',
  components: { Column },
  setup() {
    const tasks = ref([]);
    const backendBaseUrl = process.env.VUE_APP_BACKEND_BASE_URL;

    const todoItems = computed(() => tasks.value.filter(task => task.status === 'To-Do'));
    const doingItems = computed(() => tasks.value.filter(task => task.status === 'Doing'));
    const doneItems = computed(() => tasks.value.filter(task => task.status === 'Done'));

    const fetchTasks = async () => {
      try {
        const response = await fetch(`${backendBaseUrl}/tasks`);
        tasks.value = await response.json();
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    const addItem = async (description) => {
      const newTask = { description, priority: 'Low', status: 'To-Do' }; // Default values
      try {
        const response = await fetch(`${backendBaseUrl}/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTask),
        });
        const addedTask = await response.json();
        tasks.value.push(addedTask);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    };

    const updateItems = async ({ item, to }) => {
      const taskToUpdate = tasks.value.find(task => task.id === item.id);
      if (taskToUpdate) {
        taskToUpdate.status = to;
        try {
          await fetch(`${backendBaseUrl}/tasks/${taskToUpdate.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskToUpdate),
          });
        } catch (error) {
          console.error('Error updating task:', error);
        }
      }
    };

    const deleteTask = async (item) => {
      try {
        await fetch(`${backendBaseUrl}/tasks/${item.id}`, {
          method: 'DELETE',
        });
        tasks.value = tasks.value.filter(task => task.id !== item.id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };

    const editTask = async (item) => {
      const taskToUpdate = tasks.value.find(task => task.id === item.id);
      if (taskToUpdate) {
        taskToUpdate.description = item.description;
        try {
          await fetch(`${backendBaseUrl}/tasks/${taskToUpdate.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskToUpdate),
          });
        } catch (error) {
          console.error('Error editing task:', error);
        }
      }
    };

    const updatePriority = async (item) => {
      const taskToUpdate = tasks.value.find(task => task.id === item.id);
      if (taskToUpdate) {
        taskToUpdate.priority = item.priority;
        try {
          await fetch(`${backendBaseUrl}/tasks/${taskToUpdate.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskToUpdate),
          });
        } catch (error) {
          console.error('Error updating priority:', error);
        }
      }
    };

    onMounted(fetchTasks);

    return { todoItems, doingItems, doneItems, addItem, updateItems, deleteTask, editTask, updatePriority };
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
