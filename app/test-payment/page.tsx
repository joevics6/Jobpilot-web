"use client";

import { useState } from 'react';
import { PaymentModal } from '@/components/payment/PaymentModal';

export default function TestPaymentPage() {
  const [open, setOpen] = useState(true);
  const [paid, setPaid] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Test Payment</h1>
        <p className="text-gray-600 mb-8">Click below to test Paystack integration</p>
        
        {!paid ? (
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Open Payment Modal
          </button>
        ) : (
          <div className="text-green-600 text-xl">
            Payment Successful!
          </div>
        )}

        <PaymentModal
          open={open}
          onOpenChange={setOpen}
          paymentType="credits"
          amount={100}
          creditAmount={50}
          title="Test Payment"
          description="Buy 50 credits for ₦100"
          onSuccess={() => setPaid(true)}
        />
      </div>
    </div>
  );
}