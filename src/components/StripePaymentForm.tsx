import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface StripePaymentFormProps {
  amount: number;
  description: string;
  onSuccess: (paymentIntentId: string) => void;
  onCancel: () => void;
  clientSecret: string;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  amount,
  description,
  onSuccess,
  onCancel,
  clientSecret,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  // Billing details state
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "US",
    },
  });

  const cardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  // Handle input changes for billing details
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    // Clear validation error when user types
    if (validationErrors[id]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }

    // Handle nested address fields
    if (id.startsWith("address.")) {
      const addressField = id.split(".")[1];
      setBillingDetails((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      // Handle top-level fields
      setBillingDetails((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  // Handle country selection
  const handleCountryChange = (value: string) => {
    setBillingDetails((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        country: value,
      },
    }));

    // Clear country validation error
    if (validationErrors["address.country"]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors["address.country"];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate required fields
    if (!billingDetails.name.trim()) {
      newErrors["name"] = "Name is required";
    }

    if (!billingDetails.email.trim()) {
      newErrors["email"] = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(billingDetails.email)) {
      newErrors["email"] = "Email is invalid";
    }

    if (!billingDetails.address.line1.trim()) {
      newErrors["address.line1"] = "Address is required";
    }

    if (!billingDetails.address.city.trim()) {
      newErrors["address.city"] = "City is required";
    }

    if (!billingDetails.address.postal_code.trim()) {
      newErrors["address.postal_code"] = "Postal code is required";
    }

    // Set validation errors
    setValidationErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    // Validate form
    if (!validateForm()) {
      setError("Please fill in all required fields");
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Card element not found");
      setProcessing(false);
      return;
    }

    try {
      // Check if this is a mock payment
      if (clientSecret.startsWith("pi_mock_")) {
        console.log("Processing mock payment for demo purposes");
        console.log("Client secret:", clientSecret);
        console.log("Billing details:", billingDetails);

        // Simulate payment processing delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Simulate successful payment
        const mockPaymentIntentId = clientSecret.split("_secret_")[0];
        console.log("Mock payment successful with ID:", mockPaymentIntentId);

        setError(null);
        setSucceeded(true);
        setProcessing(false);
        onSuccess(mockPaymentIntentId);
        return;
      }

      // Use real Stripe payment confirmation for real payment intents
      console.log("Processing real payment with client secret:", clientSecret);
      console.log("Billing details:", billingDetails);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: billingDetails.name,
              email: billingDetails.email,
              phone: billingDetails.phone || undefined,
              address: {
                line1: billingDetails.address.line1,
                line2: billingDetails.address.line2 || undefined,
                city: billingDetails.address.city,
                state: billingDetails.address.state || undefined,
                postal_code: billingDetails.address.postal_code,
                country: billingDetails.address.country,
              },
            },
          },
        },
      );

      if (error) {
        console.error("Stripe payment error:", error);
        setError(
          error.message || "An error occurred during payment processing",
        );
        setProcessing(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log("Payment successful! Payment Intent ID:", paymentIntent.id);
        setError(null);
        setSucceeded(true);
        setProcessing(false);
        onSuccess(paymentIntent.id);
      } else {
        console.error("Payment failed with status:", paymentIntent?.status);
        setError("Payment failed. Please try again.");
        setProcessing(false);
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      setError("An unexpected error occurred. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Complete Your Payment</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="space-y-4">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {succeeded && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-500" />

            <AlertTitle className="text-green-700">
              Payment Successful
            </AlertTitle>
            <AlertDescription className="text-green-600">
              Your payment has been processed successfully.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-2">
              Amount: ${(amount / 100).toFixed(2)}
            </p>
          </div>

          <h3 className="text-base font-semibold mb-2">Billing Information</h3>

          {/* Name */}
          <div className="mb-3">
            <Label htmlFor="name" className="block text-sm mb-1">
              Name on Card *
            </Label>
            <Input
              id="name"
              value={billingDetails.name}
              onChange={handleInputChange}
              className={`h-9 ${validationErrors.name ? "border-red-500" : ""}`}
              required
            />

            {validationErrors.name && (
              <p className="text-red-500 text-xs mt-1">
                {validationErrors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <Label htmlFor="email" className="block text-sm mb-1">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={billingDetails.email}
              onChange={handleInputChange}
              className={`h-9 ${validationErrors.email ? "border-red-500" : ""}`}
              required
            />

            {validationErrors.email && (
              <p className="text-red-500 text-xs mt-1">
                {validationErrors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-3">
            <Label htmlFor="phone" className="block text-sm mb-1">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              value={billingDetails.phone}
              onChange={handleInputChange}
              className="h-9"
            />
          </div>

          <h3 className="text-base font-semibold mb-2">Billing Address</h3>

          {/* Address Line 1 */}
          <div className="mb-3">
            <Label htmlFor="address.line1" className="block text-sm mb-1">
              Address *
            </Label>
            <Input
              id="address.line1"
              value={billingDetails.address.line1}
              onChange={handleInputChange}
              className={`h-9 ${validationErrors["address.line1"] ? "border-red-500" : ""}`}
              required
            />

            {validationErrors["address.line1"] && (
              <p className="text-red-500 text-xs mt-1">
                {validationErrors["address.line1"]}
              </p>
            )}
          </div>

          {/* Address Line 2 */}
          <div className="mb-3">
            <Label htmlFor="address.line2" className="block text-sm mb-1">
              Address Line 2
            </Label>
            <Input
              id="address.line2"
              value={billingDetails.address.line2}
              onChange={handleInputChange}
              className="h-9"
            />
          </div>

          {/* City and State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
              <Label htmlFor="address.city" className="block text-sm mb-1">
                City *
              </Label>
              <Input
                id="address.city"
                value={billingDetails.address.city}
                onChange={handleInputChange}
                className={`h-9 ${validationErrors["address.city"] ? "border-red-500" : ""}`}
                required
              />

              {validationErrors["address.city"] && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors["address.city"]}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="address.state" className="block text-sm mb-1">
                State/Province
              </Label>
              <Input
                id="address.state"
                value={billingDetails.address.state}
                onChange={handleInputChange}
                className="h-9"
              />
            </div>
          </div>

          {/* Postal Code and Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div>
              <Label
                htmlFor="address.postal_code"
                className="block text-sm mb-1"
              >
                Postal Code *
              </Label>
              <Input
                id="address.postal_code"
                value={billingDetails.address.postal_code}
                onChange={handleInputChange}
                className={`h-9 ${validationErrors["address.postal_code"] ? "border-red-500" : ""}`}
                required
              />

              {validationErrors["address.postal_code"] && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors["address.postal_code"]}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="address.country" className="block text-sm mb-1">
                Country *
              </Label>
              <Select
                value={billingDetails.address.country}
                onValueChange={handleCountryChange}
              >
                <SelectTrigger id="address.country" className="h-9">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="GB">United Kingdom</SelectItem>
                  <SelectItem value="AU">Australia</SelectItem>
                  <SelectItem value="IN">India</SelectItem>
                  <SelectItem value="DE">Germany</SelectItem>
                  <SelectItem value="FR">France</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <h3 className="text-base font-semibold mb-2">Credit Card</h3>

          <div className="mb-4">
            <div className="p-2 border rounded-md">
              <CardElement options={cardElementOptions} />
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={processing}
              className="h-9 px-3 text-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!stripe || processing || succeeded}
              className="bg-college-blue-500 hover:bg-college-blue-600 h-9 px-4 text-sm"
            >
              {processing ? (
                <>
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay $${(amount / 100).toFixed(2)}`
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StripePaymentForm;
