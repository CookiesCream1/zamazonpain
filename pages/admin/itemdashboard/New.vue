<script setup lang="ts">
import Topbar from '@/components/Topbar.vue'
import type { FormSubmitEvent } from '#ui/types'
definePageMeta({
  middleware: ['admin', 'auth']
})

const state = reactive({
  productName: undefined,
  price: undefined,
  productDescription: undefined,
  category: undefined
})
const err: Ref<null | string> = ref(null)
const form = ref()
const submit = (_event: FormSubmitEvent<any>) => {
  $fetch('/api/admin/products', {
    method: 'POST',
    body: { ...state }
  })
    .then(async _ => await navigateTo({ path: '/admin/itemdashboard' }))
    .catch(e => (err.value = JSON.stringify(e)))
}
const { data: categories, status } = await useFetch('/api/public/category', {
  lazy: true,
  transform: product => product.categories.map(c => c.name)
})
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
    <div v-if="err !== null">
      {{ err }}
    </div>
    <UForm ref="form" :state="state" @submit="submit">
      <UFormGroup label="product name" name="productName">
        <UInput v-model="state.productName" type="text" />
      </UFormGroup>
      <UFormGroup label="Price" name="price">
        <UInput v-model="state.price" type="number" step="0.01" />
      </UFormGroup>
      <UFormGroup v-if="status === 'success'" label="Category" name="category">
        <USelectMenu
          v-model="state.category"
          :options="categories as string[]"
          class="w-64"
        />
      </UFormGroup>
      <NuxtLoadingIndicator v-else />
      <UFormGroup label="Description" name="productDescription">
        <UTextarea v-model="state.productDescription" type="text" />
      </UFormGroup>
      <UButton type="submit">
        submit
      </UButton>
    </UForm>
  </div>
</template>
