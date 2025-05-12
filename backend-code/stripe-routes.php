<?php

// Add these routes to your routes/api.php file

use App\Http\Controllers\StripeController;

// Stripe payment routes
Route::post('/create-payment-intent', [StripeController::class, 'createPaymentIntent']);
Route::post('/update-payment-status', [StripeController::class, 'updatePaymentStatus']);
