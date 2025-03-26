import { z } from 'zod'
import { useServerStripe } from '#stripe/server'

const schema = z.object({
  currency: z.string().max(3).min(3),
  amount: z.number().positive().int()
})

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event)
  const query = getQuery(event)
  const { amount, currency } = schema.parse({
    amount: +(query.amount?.valueOf() ?? -1),
    currency: query.currency?.valueOf()
  })
  let paymentIntent

  try {
    paymentIntent = await stripe.paymentIntents.create({
      currency,
      amount,
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
