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
    // For testing purposes, we'll use a mock client secret
    // In production, this should come from your backend

    // Generate a mock client secret that looks like a real one
    // This is ONLY for testing the UI flow - it won't work for actual payments
    const mockClientSecret = `pi_${Math.random().toString(36).substring(2, 15)}_secret_${Math.random().toString(36).substring(2, 15)}`;

    console.log('Created mock payment intent for testing');
    console.log('Amount:', amount / 100);
    console.log('Description:', description);
    console.log('Metadata:', metadata);

    // In a real implementation, you would call your backend API here
    // const response = await axios.post(`${API_BASE_URL}/create-payment-intent`, {
    //   amount,
    //   description,
    //   metadata
    // });

    // Return a mock response
    return {
      success: true,
      clientSecret: mockClientSecret
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
    // For testing purposes, we'll just log the information
    console.log('Payment status updated (mock)');
    console.log('Form ID:', formId);
    console.log('Payment Intent ID:', paymentIntentId);

    // In a real implementation, you would call your backend API here
    // const response = await axios.post(`${API_BASE_URL}/update-payment-status`, {
    //   form_id: formId,
    //   payment_intent_id: paymentIntentId
    // });

    // Return a mock response
    return {
      success: true,
      message: 'Payment status updated successfully (mock)'
    };
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
};
