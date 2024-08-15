<script setup lang="ts">
import useCart from '@/data/cart'
const { getItems: items, getTotal: total, clear } = useCart()
const checkout = async () => {
  await $fetch('/api/public/checkout', {
    method: 'POST',
    body: {
      total_price: total,
      product_arr: items().map(v => ({
        product_id: v.product_id,
        price: v.price,
        count: v.count
      }))
    }
  })
  clear()
  await navigateTo({ path: '/' })
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
