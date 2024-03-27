<script setup lang="ts">
definePageMeta({
  auth: false
})
const categories = (await useFetch('/api/db/category')).data
const products = useFetch('/api/db/products').data
const test = (await useFetch('/api/admin/test')).data
</script>

<template>
  <div class="toplevel">
    <p class="h-16">
      {{ test }}
    </p>
    <Topbar class="topbar" />
    <div v-if="categories !== null" class="sidebar">
      <Categories v-for="category of [categories]" v-bind="category" :key="category?.title ?? 'fail'" />
    </div>
    <div v-else class="sidebar">
      issue retrieving categories
    </div>
    <div class="main">
      <ProductSquare v-for="product of products" v-bind="product" :key="product.productName" />
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
