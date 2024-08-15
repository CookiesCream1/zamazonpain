<script setup>
definePageMeta({
  middleware: ['admin', 'auth']
})
const { data: users, status } = await useFetch('/api/admin/users', {
  lazy: true
})
</script>

<template>
  <div>
    <Topbar />
    <ul v-if="status === 'success'" class="w-3/4">
      <li v-for="user in users" :key="user.user_id" class="grid grid-cols-3">
        <div>{{ user.user_id }}</div>
        <div>{{ user.role_name }}</div>
        <div>{{ user.created_at }}</div>
      </li>
    </ul>
    <div v-else>
      loading...
    </div>
  </div>
</template>
