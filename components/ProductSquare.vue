<script setup lang="ts">
import useCart from '@/data/cart'
defineProps<{
  productId: number;
  productName: string;
  description: string;
  price: number;
  rating: number;
}>()
const cart = useCart()
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
      <div>$</div>
      <div style="font-size: 2em; line-height: 2rem">
        {{ Math.floor(price) }}
      </div>
      <div>
        {{
          (+price).toFixed(2).substring((+price).toFixed(2).indexOf(".") + 1)
        }}
      </div>
    </div>
    <button
      @click="
        cart.addItem(
          { product_id: productId, product_name: productName, price },
          1
        )
      "
    >
      buy
    </button>
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
