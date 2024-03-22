<script setup lang="ts">
import { useUserStore } from '../data/User'
const user = useUserStore()
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
    <NuxtLink v-if="user.tag == 'not logged in'" to="/login">
      not logged in
    </NuxtLink>
    <p v-else>
      user: {{ user.name }}
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
