<script setup lang="ts">
const user = useAuthState()
</script>

<template>
  <div class="mainmenu">
    <NuxtLink to="/">
      home
    </NuxtLink>
    <input id="search" type="text" name="search">
    <label for="search">search?</label>
    <NuxtLink to="/test/hworld">
      test
    </NuxtLink>
    <NuxtLink to="/test/hworld">
      test
    </NuxtLink>
    <NuxtLink v-if="user.status.value !== 'authenticated'" to="/login">
      not logged in
    </NuxtLink>
    <p v-else style="color: white;">
      user: {{ user.data.value?.user?.name ?? 'No Name' }}
    </p>
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
}
</style>
