"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function resetPassword() {
  const [form, setForm] = useState({
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const generateOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/forgotPassword", {
        email: form.email,
      });

      if (res.data.status === 200) {
        router.push(`/changePassword?email=${form.email}`);
      }
    } catch (error) {}
  };

  const verifyForgotPassOtp = async () => {
    setLoading(true);

    try {
        
    } catch (error) {
        
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6 animate-in fade-in slide-in-from-bottom-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">
          Reset your Password
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <Input
            id="email"
            placeholder="you@example.com"
            name="email"
            onChange={handleChange}
            value={form.email}
          />
        </div>
      </div>
      <Button
        onClick={generateOtp}
        disabled={loading}
        className="w-full rounded-full bg-gradient-to-br from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900"
      >
        {loading ? (
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
        ) : (
          "Sign In"
        )}
      </Button>
    </div>
  );
}
