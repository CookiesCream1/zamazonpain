<script setup lang="ts">
import { ref, watch } from 'vue'
import useCart from '@/data/cart'
const { getItems: items, getTotal: total, clear } = useCart()
const { stripe } = useClientStripe()
let ClientSecret: string | undefined
const showOverrideButton = ref(false) // Controls override button visibility

const checkout = () => {
  showOverrideButton.value = true // Show override button after checko
  if (ClientSecret === undefined) {
    return
  }
  stripe.value.confirmPayment({
    clientSecret: ClientSecret,
    confirmParams: {
      return_url: 'https://www.google.com/'
    }
  })
}

watch(
  stripe,
  async () => {
    if (stripe.value) {
      const { clientSecret, error } = await $fetch(
        '/api/public/createPaymentIntent',
        { query: { amount: Math.floor(total() * 100), currency: 'czk' } }
      )

      if (error) {
        console.error(error)
        return
      }
      if (clientSecret !== null) {
        ClientSecret = clientSecret
      }
    }
  },
  {
    immediate: true
  }
)

const override = async () => {
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

    const { saleId } = response

    clear()
    await navigateTo({ path: '/cart/edit', query: { sale_id: saleId } })
  } catch (error) {
    console.error('Checkout failed:', error)
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
        </div>
      </span>
    </div>
    <div class="flex justify-end" style="margin-right: 20px">
      total of: {{ total() }}
    </div>
    <br>
    <div class="checkoutzone">
      <UButton class="px-2 py-1 bg-gray-200 rounded-md" @click="clear()">
        clear cart
      </UButton>
      <UButton class="px-2 py-1 bg-gray-200 rounded-md" @click="checkout">
        checkout
      </UButton>
    </div>

    <!-- shazam, a cunt appears! -->
    <div v-if="showOverrideButton" class="flex justify-end mt-4">
      <UButton class="px-2 py-1 bg-red-500 text-white rounded-md" @click="override">
        override
      </UButton>
    </div>

    <div id="linkAuthenticationElement" />
  </div>
</template>
