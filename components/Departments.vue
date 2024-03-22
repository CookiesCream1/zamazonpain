<script setup lang="ts">
defineProps<{
  deparements: { name: string; checked: boolean }[];
  title: string;
}>()
</script>

<template>
  <div class="alignment">
    <h3>{{ title }}</h3>
    <ul>
      <li v-for="department in deparements" :key="department.name">
        <div style="display: flex; gap: 0.5rem">
          <input
            :id="department.name"
            v-model="department.checked"
            type="checkbox"
          >
          <p>{{ department.name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
.alignment {
  display: flex;
  flex-direction: column;
}

.fix {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

li {
  list-style: none;
}

p {
  margin: 0;
}
</style>
