<script setup lang="ts">
import TopBar from '@/components/Topbar.vue'
definePageMeta({
  middleware: ['admin', 'auth']
})
const { data: products, refresh } = await useFetch('/api/admin/products', {
  lazy: true
})
const toggle = (id: number, OnOff: boolean) => {
  $fetch('/api/admin/products', {
    method: 'PATCH',
    body: {
      id,
      OnOff
    }
  }).then(() => refresh())
}
</script>

<template>
  <div>
    <TopBar />
    <button class="button-flat-link">
      <NuxtLink to="itemdashboard/new">
        add new
      </NuxtLink>
    </button>
    <ul class="grid-container">
      <li v-for="product in products" :key="product.productName" class="flex">
        <div class="flex flex-col w-32 gap-2">
          <p>{{ product.productName }}</p>
          <p>REMOVED: {{ product.removed === 0 ? "no" : "yes" }}</p>
        </div>
        <div class="flex flex-col w-32 gap-2">
          <button class="button-flat" @click="toggle(product.productId, true)">
            add back
          </button>
          <button class="button-flat" @click="toggle(product.productId, false)">
            remove
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
.button-flat {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.button-flat:hover {
  background-color: #2980b9;
}
.grid-container {
  display: grid;
  display:flex;
  grid-template-columns: repeat(6, 1fr);
  gap: 24px;
  padding: 24px;
  align-items: center;
  flex-wrap:wrap;
}
.button-flat-link {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  display:flex;

}

</style>
