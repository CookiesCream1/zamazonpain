import { defineStore } from 'pinia'
type product = Record<string, unknown> & {
  product_id: number;
  product_name: string;
  price: number;
};
type cartItem = Record<string, unknown> & product & { count: number };

export default defineStore('cart', function () {
  const items = ref([] as cartItem[])

  function getItem (itemName: string) {
    return items.value.filter(e => e.product_name === itemName)[0]
  }

  function getTotal () {
    return items.value.reduce((a, b) => a + b.count * b.price, 0)
  }

  function removeItem (itemName: string) {
    function pred (e: cartItem) {
      return e.product_name === itemName
    }
    if (items.value.some(pred)) {
      const idx = items.value.findIndex(pred)
      if (items.value[idx].count === 1) {
        items.value = items.value.filter(pred)
      } else {
        items.value[idx].count--
      }
    }
  }

  function addItem (product: product, amount: number) {
    const pred = (e: cartItem) => e.product_name === product.product_name
    if (items.value.some(pred)) {
      const idx = items.value.findIndex(pred)
      items.value[idx].count += amount
    } else {
      items.value.push({ ...product, count: amount })
    }
  }

  function getItems () {
    return items.value
  }

  function clear () {
    items.value = []
  }

  return {
    getItems,
    getItem,
    getTotal,
    removeItem,
    addItem,
    clear
  }
})
