<script setup>
const result = useFetch('/api/db/init')
</script>

<template>
  <p>{{ result.data.value }}</p>
</template>
