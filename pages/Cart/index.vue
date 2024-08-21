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
    <div v-for="item of items()" :key="item.product_name" class="itemdisp">
      <div>
        {{ item.product_name }}
      </div>
      <div>
        price:
        {{ item.price }}
      </div>
      <div>total of: {{ total() }}</div>
    </div>
    <br>
    <div class="checkoutzone">
      <button @click="checkout">
        checkout
      </button>
      <button @click="clear()">
        clear cart
      </button>
    </div>
  </div>
</template>

<style scoped>
.checkoutzone {
  display: flex;
  gap: 1em;
}
.itemdisp {
  display: flex;
  gap: 2em;
}
</style>
