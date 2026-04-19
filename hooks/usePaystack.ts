"use client";

import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

interface PaymentOptions {
  email: string;
  amount: number;
  paymentType: 'subscription' | 'credits';
  planId?: string;
  planType?: string;
  creditAmount?: number;
  callback_url?: string;   // Added to support dynamic redirect (especially for Apply for Me)
}

interface UsePaystackReturn {
  initializePayment: (options: PaymentOptions) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export function usePaystack(): UsePaystackReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializePayment = useCallback(async (options: PaymentOptions) => {
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('User not authenticated');
        setLoading(false);
        return false;
      }

      const response = await fetch('/api/payment/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: options.email,
          amount: options.amount,
          userId: user.id,
          paymentType: options.paymentType,
          planId: options.planId,
          planType: options.planType,
          creditAmount: options.creditAmount,
          callback_url: options.callback_url,     // Forward callback_url to backend
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to initialize payment');
        setLoading(false);
        return false;
      }

      // Redirect to Paystack's hosted payment page
      window.location.href = data.authorizationUrl;
      return true;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
      return false;
    }
  }, []);

  return { initializePayment, loading, error };
}