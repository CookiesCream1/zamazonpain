<script setup lang="ts">
defineProps<{
  title: string;
  detailText: string;
  price: number;
  rating: number;
  imageLink: string;
}>()
</script>

<template>
  <div class="boundingbox">
    <nuxt-img :src="imageLink" width="250px" />
    <h3 style="padding-left: 5%">
      {{ title }}
    </h3>
    <div class="starfix">
      <NuxtRating :read-only="true" :rating-value="rating" />
    </div>
    <p>{{ detailText }}</p>
    <div class="priceContainer">
      <div>$</div>
      <div style="font-size: 2em; line-height: 2rem">
        {{ Math.floor(price) }}
      </div>
      <div>{{ price * 100 - Math.floor(price) * 100 }}</div>
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
