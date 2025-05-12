#!/bin/bash

# Install Stripe PHP library
composer require stripe/stripe-php

# Update .env file with Stripe keys
echo "STRIPE_SECRET_KEY=your_stripe_secret_key_here" >> .env
echo "STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here" >> .env

# Run migrations
php artisan migrate
