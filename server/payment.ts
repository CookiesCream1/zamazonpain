import { useServerStripe } from "#stripe/server";
import cartStore from '@/data/cart'; // Ensure correct store import
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event);
  if (!stripe) {
    throw new Error("Stripe instance could not be initialized.");
  }

  // Initialize Pinia store
  const cart = cartStore();
  const orderAmount = Number(cart.getTotal()); // Ensure it's a number

  if (isNaN(orderAmount) || orderAmount <= 0) {
    throw new Error("Invalid order amount.");
  }

  let paymentIntent;

  try {
    paymentIntent = await stripe.paymentIntents.create({
      currency: 'czk',
      amount: orderAmount,
      automatic_payment_methods: { enabled: true }
    });

    return {
      clientSecret: paymentIntent.client_secret,
      error: null
    };
  } catch (e) {
    return {
      clientSecret: null,
    };
  }
});