"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      );

      if (error) {
        console.error(error);
        router.push("/login"); // fallback
        return;
      }

      // success → redirect anywhere you want
      router.push("/dashboard"); // or "/"
    };

    handleAuth();
  }, [router]);

  return <p className="p-6">Signing you in...</p>;
}