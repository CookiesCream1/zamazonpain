<script setup lang="ts">
import ProductSquareadm from '~/components/ProductSquareadm.vue'
definePageMeta({
  auth: false
})
const categories = useFetch('/api/public/category').data
const products = useFetch('/api/public/products').data
</script>

<template>
  <div class="toplevel">
    <Topbar class="topbar" />
    <div class="main">
      <ProductSquareadm v-for="product of products" v-bind="product" :key="product.productName" />
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

.main {
  grid-area: main;
  padding: 1rem;
  gap: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
}
</style>
