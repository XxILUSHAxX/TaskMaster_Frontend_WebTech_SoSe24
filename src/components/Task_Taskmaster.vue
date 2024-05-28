<template>
  <div class="task">
    {{ task.title }}
  </div>
</template>

<script>
export default {
  props: ['task']
};
</script>

<style>
.task {
  padding: 10px;
  margin: 5px 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
}
</style>
