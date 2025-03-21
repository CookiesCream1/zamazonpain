import { EventHandlerRequest, H3Event } from 'h3'
import getTotal from '@/data/cart'

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event)
  const orderAmount = getTotal
  let paymentIntent

  try {
    paymentIntent = await stripe.paymentIntents.create({
      currency: 'czk',
      amount: orderAmount,
      automatic_payment_methods: { enabled: true }
    })

    return {
      clientSecret: paymentIntent.client_secret,
      error: null
    }
  } catch (e) {
    return {
      clientSecret: null,
      error: e
    }
  }
})

function useServerStripe (event: H3Event<EventHandlerRequest>) {
  throw new Error('Function not implemented.')
}
