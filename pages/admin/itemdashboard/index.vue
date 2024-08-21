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
    <NuxtLink to="itemdashboard/new">
      add new
    </NuxtLink>
    <ul class="grid grid-cols-4">
      <li v-for="product in products" :key="product.productName" class="flex">
        <div class="flex flex-col w-32 gap-2">
          <p>{{ product.productName }}</p>
          <p>REMOVED: {{ product.removed === 0 ? "no" : "yes" }}</p>
        </div>
        <div class="flex flex-col w-32 gap-2">
          <button @click="toggle(product.productId, false)">
            remove
          </button>
          <button @click="toggle(product.productId, true)">
            add back
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
