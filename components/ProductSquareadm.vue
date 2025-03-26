<script setup lang="ts">
import products from '~/server/api/public/products'

definePageMeta({
  middleware: ['admin', 'auth']
})
const { data: product, refresh } = await useFetch('/api/admin/products', {
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
defineProps<{
  productId: number;
  productName: string;
  description: string;
  price: number;
  rating: number;
  removed: number;
}>()

</script>

<template>
  <div class="boundingbox">
    <USkeleton class="w-[250px] h-[250px]" />
    <h3 style="padding-left: 5%">
      {{ productName }}
    </h3>
    <div class="starfix">
      <NuxtRating :read-only="true" :rating-value="rating" />
    </div>
    <p>{{ description }}</p>
    <div class="priceContainer">
      <div style="font-size: 2em; line-height: 2rem">
        {{ Math.floor(price) }}
      </div>
      <div>
        {{
          (+price).toFixed(2).substring((+price).toFixed(2).indexOf(".") + 1)
        }}
      </div>
      <div>CZK</div>
    </div>
    <div
      class="px-2 py-1 bg-gray-200 rounded-md w-full flex justify-end bottom-0 right-0"
      style="background-color: antiquewhite; margin-bottom: 10px;"
    />

    <li v-for="product in products" :key="product.productName" class="flex">
      <p>REMOVED: {{ removed === 0 ? "no" : "yes" }}</p>

      <div class="flex flex-col w-32 gap-2">
        <UButton @click="toggle(productId, false)">
          remove
        </UButton>
        <UButton @click="toggle(productId, true)">
          add back
        </UButton>
      </div>
    </li>
  </div>
</template>

<style>
.boundingbox {
  background-color: antiquewhite;
  border: solid;
  border-color: azure;
  color: black;
  width: min-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.priceContainer {
  display: flex;
  padding: 0.5rem;
}
</style>
