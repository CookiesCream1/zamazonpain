<script setup>
import { ref } from 'vue'

// const newCard = ref('')
// const newCsv = ref('')

function submitForm () {
  // const csvValue = Number(newCsv.value)
  // const cardValue = Number(newCard.value)
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <h1>Platba</h1>

    <label for="fname">Jméno na kartě:</label>
    <UInput type="text" />

    <label for="card">Číslo karty:</label>
    <UInputNumber
      v-model="value"
      :min="100000000000"
      :max="999999999999"
    /><br><br>

    <label for="csv">CSV:</label>
    <UInputNumber v-model="value" :min="100" :max="9999" /><br><br>

    <button type="submit">
      Zaplatit
    </button>
  </form>
</template>

<style></style>
