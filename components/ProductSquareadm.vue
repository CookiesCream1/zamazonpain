<script setup lang="ts">
defineProps<{
  productId: number;
  productName: string;
  description: string;
  price: number;
  rating: number;
  removed: number;
}>()
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
    >
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
