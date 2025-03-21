<script setup lang="ts">
const user = useAuthState()
const { data: role } = await useFetch('/api/user/role')
const { signOut } = useAuth()
</script>

<template>
  <div class="mainmenu">
    <NuxtLink to="/">
      home
    </NuxtLink>
    <input id="search" type="text" name="search">
    <label for="search">search?</label>
    <NuxtLink to="/admin/users">
      admin
    </NuxtLink>
    <NuxtLink
      v-if="user.status.value === 'authenticated' && role === 'admin'"
      to="/admin/itemdashboard"
    >
      product dashboard
    </NuxtLink>
    <NuxtLink to="/cart">
      Cart
    </NuxtLink>
    <NuxtLink v-if="user.status.value !== 'authenticated'" to="/login">
      not logged in
    </NuxtLink>
    <button v-else style="color: white" @click="signOut()">
      user: {{ user.data.value?.user?.name ?? "No Name" }}
    </button>
  </div>
</template>

<style>
.mainmenu {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #000000;
  height: 4rem;
  padding: 1rem;
  color: antiquewhite;
}
</style>
