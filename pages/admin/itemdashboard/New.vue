<script setup lang="ts">
import Topbar from '@/components/Topbar.vue'
import type { FormSubmitEvent } from '#ui/types'
definePageMeta({
  middleware: ['admin', 'auth']
})
const state = reactive({
  productName: undefined,
  price: undefined,
  productDescription: undefined
})
const form = ref()
const submit = (_event: FormSubmitEvent<any>) => {
  console.log(state)
}
</script>
<!-- productId: number;
    productName: string;
    price: number;
    description: string;
    rating: number;
    removed: number; -->

<template>
  <div>
    <Topbar />
    <UForm ref="form" :state="state" @submit="submit">
      <UFormGroup label="product name" name="productName">
        <UInput v-model="state.productName" type="text" />
      </UFormGroup>
      <UFormGroup label="Price" name="price">
        <UInput v-model="state.price" type="number" step="0.01" />
      </UFormGroup>
      <UFormGroup label="Description" name="productDescription">
        <UTextarea v-model="state.productDescription" />
      </UFormGroup>
      <UButton type="submit">
        submit
      </UButton>
    </UForm>
  </div>
</template>
