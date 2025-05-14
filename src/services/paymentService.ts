import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const API_BASE_URL = 'https://zoffness.academy/api';

// Load Stripe instance
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

/**
 * Create a payment intent with Stripe
 * This is a temporary implementation for testing that creates a payment intent client-side
 * In production, this should be done server-side for security reasons
 *
 * @param amount - Amount in cents (e.g., $10.00 = 1000)
 * @param description - Description of the payment
 * @param metadata - Additional metadata for the payment
 */
export const createPaymentIntent = async (
  amount: number,
  description: string,
  metadata: Record<string, any> = {}
) => {
  try {
    // Create a PaymentIntent through our backend API
    const response = await axios.post(`${API_BASE_URL}/create-payment-intent`, {
      amount,
      currency: 'usd',
      description,
      metadata
    });

    console.log('Created payment intent');
    console.log('Amount:', amount / 100);
    console.log('Description:', description);

    // Return the client secret from the response
    return {
      success: true,
      clientSecret: response.data.clientSecret
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

/**
 * Update payment status after successful payment
 * This is a temporary implementation for testing
 *
 * @param formId - ID of the form submission
 * @param paymentIntentId - Stripe payment intent ID
 */
export const updatePaymentStatus = async (
  formId: string,
  paymentIntentId: string
) => {
  try {
    // Update payment status through our backend API
    const response = await axios.post(`${API_BASE_URL}/update-payment-status`, {
      form_id: formId,
      payment_intent_id: paymentIntentId
    });

    console.log('Payment status updated');
    console.log('Form ID:', formId);
    console.log('Payment Intent ID:', paymentIntentId);

    // Return the response from the API
    return {
      success: true,
      message: 'Payment status updated successfully'
    };
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
};
