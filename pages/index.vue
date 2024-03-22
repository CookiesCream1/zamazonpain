<script setup lang="ts">
import * as f from '../data/fakedata'
</script>

<template>
  <div class="toplevel">
    <Topbar class="topbar" />
    <div class="sidebar">
      <Departments
        v-for="department of f.departments"
        v-bind="department"
        :key="department.title"
      />
    </div>
    <div class="main">
      <ProductSquare
        v-for="product of f.products"
        v-bind="product"
        :key="product.title"
      />
    </div>
  </div>
</template>

<style scoped>
.toplevel {
  display: grid;
  grid-template-columns: 0fr 2fr;
  grid-template-rows: 0fr 2fr;
  grid-auto-flow: row;
  grid-template-areas:
    "topbar topbar"
    "sidebar main";
}

.topbar {
  grid-area: topbar;
}

.sidebar {
  grid-area: sidebar;
  padding: 1rem;
  width: 16rem;
}

.main {
  grid-area: main;
  padding: 1rem;
  gap: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
}
</style>
