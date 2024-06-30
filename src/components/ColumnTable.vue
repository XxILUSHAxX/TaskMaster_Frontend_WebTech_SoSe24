<template>
  <div class="column">
    <h2>{{ title }}</h2>
    <div class="task-list">
      <div v-for="item in items" :key="item.id" class="todo-item">
        <div class="todo-item-header">
          <div class="action-buttons">
            <button @click="deleteTask(item)" class="action-button delete-button" title="Delete task">
              <i class="fas fa-trash"></i>
            </button>
            <button v-if="title !== 'Done'" @click="enableEditMode(item)" class="action-button edit-button" title="Edit task">
              <i class="fas fa-pencil-alt"></i>
            </button>
          </div>
          <div v-if="title !== 'Done'" class="priority-dropdown">
            <select v-model="item.priority" @change="updatePriority(item)" class="priority-select">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <div class="todo-item-content">
          <p v-if="!isEditing(item)" class="task-description">{{ item.description }}</p>
          <input v-else v-model="item.editingDescription" @keyup.enter="saveEdit(item)" @blur="saveEdit(item)" class="edit-input" />
        </div>
        <div class="todo-item-actions" v-if="title !== 'Done'">
          <div v-if="title === 'To-Do'" class="move-buttons">
            <button @click="moveToDoing(item)" class="action-button move-button">
              Doing
            </button>
            <button @click="moveToDone(item)" class="action-button move-button">
              Done
            </button>
          </div>
          <div v-else-if="title === 'Doing'" class="move-buttons">
            <button @click="moveToTodo(item)" class="action-button move-button">
              To-Do
            </button>
            <button @click="moveDoingToDone(item)" class="action-button move-button">
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
    <input v-if="isTodo" v-model="newItem" @keyup.enter="addNewItem" placeholder="Add new item" class="add-input" />
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ColumnTable',
  props: {
    title: String,
    items: Array,
  },
  emits: ['add-item', 'update-items', 'delete-item', 'edit-item', 'update-priority'],
  setup(props, { emit }) {
    const newItem = ref('');
    const editingItemId = ref(null);

    const addNewItem = () => {
      if (newItem.value.trim()) {
        emit('add-item', newItem.value.trim());
        newItem.value = '';
      }
    };

    const moveToDoing = (item) => {
      emit('update-items', { item, from: 'To-Do', to: 'Doing' });
    };

    const moveToTodo = (item) => {
      emit('update-items', { item, from: 'Doing', to: 'To-Do' });
    };

    const moveDoingToDone = (item) => {
      emit('update-items', { item, from: 'Doing', to: 'Done' });
    };

    const moveToDone = (item) => {
      emit('update-items', { item, from: 'To-Do', to: 'Done' });
    };

    const deleteTask = (item) => {
      emit('delete-item', item);
    };

    const enableEditMode = (item) => {
      editingItemId.value = item.id;
      item.editingDescription = item.description;
    };

    const saveEdit = (item) => {
      if (item.editingDescription.trim()) {
        emit('edit-item', { ...item, description: item.editingDescription.trim() });
      }
      editingItemId.value = null;
    };

    const isEditing = (item) => {
      return editingItemId.value === item.id;
    };

    const updatePriority = (item) => {
      emit('update-priority', item);
    };

    const isTodo = props.title === 'To-Do';

    return { newItem, addNewItem, moveToDoing, moveToTodo, moveDoingToDone, moveToDone, deleteTask, enableEditMode, saveEdit, isEditing, updatePriority, isTodo };
  },
};
</script>

<style scoped>
.column {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 24px;
  width: 340px;
  margin: 20px;
  transition: transform 0.2s ease-in-out, box-shadow 0.3s ease-in-out;
}

.column:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

h2 {
  color: #333333;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.todo-item {
  background-color: #f9fafb;
  border: 1px solid #e0e4e8;
  border-radius: 10px;
  padding: 18px;
  position: relative;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.todo-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 14px rgba(0, 0, 0, 0.1);
}

.todo-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.action-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #777777;
  font-size: 18px;
  transition: color 0.2s;
}

.action-button:hover {
  color: #333333;
}

.priority-dropdown {
  margin-left: auto;
}

.priority-select {
  padding: 8px 14px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  background-color: #ffffff;
  font-size: 14px;
  color: #555555;
}

.todo-item-content {
  margin-top: 10px;
}

.task-description {
  margin: 0;
  font-size: 16px;
  color: #333333;
  line-height: 1.5;
}

.edit-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.edit-input:focus {
  outline: none;
  border-color: #007bff;
}

.move-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
}

.add-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  margin-top: 18px;
  font-size: 16px;
}

@media screen and (max-width: 600px) {
  .column {
    width: 100%;
  }
}
</style>
