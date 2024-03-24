<script setup>
const result = useFetch('/api/db/init')
</script>

<template>
  {{ result.data.value }}
</template>
