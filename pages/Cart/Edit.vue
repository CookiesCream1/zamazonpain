<script setup lang="ts">
import { useRoute } from 'vue-router'
import Topbar from '~/components/Topbar.vue'

const route = useRoute()
const saleId = Number(route.query.sale_id)

const { data: sale, refresh } = await useFetch('/api/public/sales', {
  params: { saleId },
  lazy: true
})

const total = computed(
  () =>
    sale.value?.saleDetails.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ) || 0
)

const updateItemQuantity = async (productId: number, quantity: number) => {
  try {
    await $fetch(`/api/public/sales`, {
      method: 'PATCH',
      body: { saleId, productId, quantity }
    })
    // Refresh sale data after update
    refresh()
  } catch (error) {
    console.error('Failed to update item:', error)
    // Handle error (e.g., show error message to user)
  }
}



</script>

<template>
  <div>
    <Topbar />
    <UContainer v-if="sale">
      <div
        v-for="item in sale.saleDetails"
        :key="item.productId"
        class="flex items-center justify-between p-4 shadow rounded-lg"
      >
        <span class="font-semibold">{{ item.productName }}</span>
        <span class="text-gray-600">Price: ${{ item.price.toFixed(2) }}</span>
        <div class="flex items-center space-x-2">
          <UButton
            :disabled="item.quantity <= 1"
            class="px-2 py-1 bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            @click="updateItemQuantity(item.productId, item.quantity - 1)"
          >
            -
          </UButton>
          <span class="font-medium">{{ item.quantity }}</span>
          <UButton
            class="px-2 py-1 bg-gray-200 rounded-md"
            @click="updateItemQuantity(item.productId, item.quantity + 1)"
          >
            +
          </UButton>
        </div>
        <span class="font-medium">Subtotal: ${{ (item.price * item.quantity).toFixed(2) }}</span>
      </div>
    </UContainer>

    <p class="container mx-auto px-4 mt-8 text-xl font-bold text-right">
      Total: ${{ total.toFixed(2) }}
    </p>
  </div>
</template>
