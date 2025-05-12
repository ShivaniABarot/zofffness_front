<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Stripe\Exception\ApiErrorException;
use App\Models\FormSubmission; // Adjust this to your actual model name

class StripeController extends Controller
{
    /**
     * Create a payment intent
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createPaymentIntent(Request $request)
    {
        // Validate request
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'description' => 'required|string',
            'metadata' => 'sometimes|array',
        ]);

        // Set Stripe API key
        Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

        try {
            // Create a payment intent
            $paymentIntent = PaymentIntent::create([
                'amount' => $request->amount, // Amount in cents
                'currency' => 'usd',
                'description' => $request->description,
                'metadata' => $request->metadata ?? [],
                'payment_method_types' => ['card'],
            ]);

            // Return the client secret
            return response()->json([
                'success' => true,
                'clientSecret' => $paymentIntent->client_secret,
            ]);
        } catch (ApiErrorException $e) {
            // Handle Stripe API errors
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        } catch (\Exception $e) {
            // Handle other errors
            return response()->json([
                'success' => false,
                'error' => 'An unexpected error occurred.',
            ], 500);
        }
    }

    /**
     * Update payment status
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updatePaymentStatus(Request $request)
    {
        // Validate request
        $request->validate([
            'form_id' => 'required|string',
            'payment_intent_id' => 'required|string',
        ]);

        try {
            // Set Stripe API key
            Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

            // Verify payment intent
            $paymentIntent = PaymentIntent::retrieve($request->payment_intent_id);

            // Check if payment was successful
            if ($paymentIntent->status !== 'succeeded') {
                return response()->json([
                    'success' => false,
                    'error' => 'Payment has not been completed.',
                ], 400);
            }

            // Update form submission status
            // Note: Adjust this based on your actual database structure
            $formId = $request->form_id;
            
            // If it's a temporary ID (client-generated), handle accordingly
            if (strpos($formId, 'temp_') === 0) {
                // Handle temporary IDs (e.g., log or create a new record)
                // This is just a placeholder - implement based on your needs
                return response()->json([
                    'success' => true,
                    'message' => 'Payment recorded successfully.',
                ]);
            }

            // Find and update the form submission
            $submission = FormSubmission::find($formId);
            
            if (!$submission) {
                return response()->json([
                    'success' => false,
                    'error' => 'Form submission not found.',
                ], 404);
            }

            // Update payment status
            $submission->payment_status = 'Success';
            $submission->payment_intent_id = $request->payment_intent_id;
            $submission->save();

            return response()->json([
                'success' => true,
                'message' => 'Payment status updated successfully.',
            ]);
        } catch (ApiErrorException $e) {
            // Handle Stripe API errors
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        } catch (\Exception $e) {
            // Handle other errors
            return response()->json([
                'success' => false,
                'error' => 'An unexpected error occurred.',
            ], 500);
        }
    }
}
