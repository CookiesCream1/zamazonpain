<script setup>
const result = useFetch('/api/db/init')
const user = useAuthState()
const role = await useAsyncData('role', () => $fetch(`/api/db/${user.data.value.user.id}/role`), { watch: [user] })
</script>

<template>
  <div class="why">
    <p>{{ result.data.value }}</p><br>
    <p>{{ user.data }}</p><br>
    <p>{{ role?.data ?? 'nothing' }}</p><br>
  </div>
</template>
