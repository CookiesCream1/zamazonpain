<script setup lang="ts">
import useCart from '@/data/cart'
const { getItems: items, getTotal: total, clear } = useCart()
const checkout = async () => {
  try {
    const response = await $fetch('/api/public/checkout', {
      method: 'POST',
      body: {
        total_price: total(),
        product_arr: items().map(v => ({
          product_id: v.product_id,
          price: v.price,
          count: v.count
        }))
      }
    })

    // The API now returns an object with a saleId property
    const { saleId } = response

    clear()
    // Navigate to the cart edit page with the sale ID
    await navigateTo({ path: '/cart/edit', query: { sale_id: saleId } })
  } catch (error) {
    console.error('Checkout failed:', error)
    // Handle error (e.g., show an error message to the user)
  }
}
</script>

<template>
  <div>
    <Topbar />
    <div
      v-for="item of items()"
      :key="item.product_name"
      class="temdisp flex items-center justify-between p-4 shadow rounded-lg"
    >
      <div>
        {{ item.product_name }}
      </div>
      <span class="font-semibold">
        <div>
          price:
          {{ item.price }}
        </div></span>
    </div>
    <div
      class="flex justify-end"
      style="margin-right: 20px"
    >
      total of: {{ total() }}
    </div>
    <br>
    <div class="checkoutzone">
      <UButton
        class="px-2 py-1 bg-gray-200 rounded-md"
        @click="clear()"
      >
        clear cart
      </UButton>
      <UButton
        class="px-2 py-1 bg-gray-200 rounded-md"
        @click="checkout"
      >
        checkout
      </UButton>
    </div>
  </div>
</template>

<style scoped>

.checkoutzone {
  display: flex;
  justify-content: end;
  gap: 1em;
  padding-right: 20px;
}
.itemdisp {
  display: flex;
  gap: 2em;
}
</style>
