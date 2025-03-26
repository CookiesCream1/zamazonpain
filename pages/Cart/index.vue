<script setup lang="ts">
import useCart from '@/data/cart'
const { getItems: items, getTotal: total, clear } = useCart()
const { stripe } = useClientStripe()
let ClientSecret: string | undefined
const checkout = () => {
  if (ClientSecret === undefined) {
    return
  }
  stripe.value.confirmPayment({
    clientSecret: ClientSecret,
    confirmParams: {
      return_url: '/Edit.vue'
    }
  })
}

watch(
  stripe,
  async () => {
    if (stripe.value) {
      // https://github.com/stripe-samples/accept-a-payment/blob/main/payment-element/client/vue-cva/src/components/SrCheckoutForm.vue
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
    <div id="linkAuthenticationElement" />
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
