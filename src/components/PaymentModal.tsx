import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import StripeProvider from "./StripeProvider";
import StripePaymentForm from "./StripePaymentForm";
import { createPaymentIntent } from "../services/paymentService";
import { Loader2 } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (paymentIntentId: string) => void;
  amount: number;
  description: string;
  metadata?: Record<string, any>;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  amount,
  description,
  metadata = {},
}) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchPaymentIntent = async () => {
        try {
          setLoading(true);
          setError(null);

          // Convert amount to cents if it's in dollars
          const amountInCents = Math.round(amount * 100);

          const { clientSecret } = await createPaymentIntent(
            amountInCents,
            description,
            metadata,
          );

          setClientSecret(clientSecret);
        } catch (err) {
          console.error("Error creating payment intent:", err);
          setError("Failed to initialize payment. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      fetchPaymentIntent();
    }
  }, [isOpen, amount, description, metadata]);

  const handleSuccess = (paymentIntentId: string) => {
    onSuccess(paymentIntentId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg md:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Your Payment</DialogTitle>
          <DialogDescription>
            Please enter your payment details to complete your registration.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-college-blue-500" />

            <span className="ml-2 text-college-blue-500">
              Initializing payment...
            </span>
          </div>
        ) : error ? (
          <div className="text-red-500 py-4 text-center">{error}</div>
        ) : clientSecret ? (
          <StripeProvider>
            <div className="py-2">
              <StripePaymentForm
                amount={amount * 100} // Convert to cents
                description={description}
                onSuccess={handleSuccess}
                onCancel={onClose}
                clientSecret={clientSecret}
              />
            </div>
          </StripeProvider>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
