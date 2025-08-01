import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { Payment } from "@/models/Payment.model";
import { connect } from "@/db/config";
import { sendOtpEmail } from "@/lib/sendOTP";


export async function POST(req: NextRequest) {
  try {
     await connect(); 

    const body = await req.json();
    const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature, email, price_id } = body;

    const token = razorpay_payment_id + "|" + razorpay_subscription_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(token)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if(isValid){
      const payment = await Payment.findOneAndUpdate(
        { subscription_id: razorpay_subscription_id },
        {
          status: "active",
          price_id,
          razorPay_payment_id: razorpay_payment_id,
          captured_at: new Date(),
        },
        { new: true }
      );
  
      if (!payment) {
        return NextResponse.json(
          { success: false, error: "Subscription not found in DB" },
          { status: 404 }
        );
      }
  
      await payment.save();
  
      sendOtpEmail(email, "", razorpay_payment_id, price_id); 
  
      return NextResponse.json({ success: true });
    }

  } catch (error: any) {
    console.error("🔴 Razorpay verify error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
