import axios from 'axios';

const API_BASE_URL = 'https://zoffness.academy/api';

/**
 * Create a payment intent with Stripe
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
    const response = await axios.post(`${API_BASE_URL}/create-payment-intent`, {
      amount,
      description,
      metadata
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

/**
 * Update payment status after successful payment
 * @param formId - ID of the form submission
 * @param paymentIntentId - Stripe payment intent ID
 */
export const updatePaymentStatus = async (
  formId: string,
  paymentIntentId: string
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/update-payment-status`, {
      form_id: formId,
      payment_intent_id: paymentIntentId
    });
    
    return response.data;
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
};
