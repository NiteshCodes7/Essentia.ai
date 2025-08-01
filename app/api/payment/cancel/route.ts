import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/config";
import { Payment } from "@/models/Payment.model";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { subscriptionId } = await req.json();

    const response = await razorpay.subscriptions.cancel(subscriptionId, true);

    if(!response){
        return NextResponse.json({ success: false, message: "No subscription" });
    }

    const paymentDetails = await Payment.findOneAndUpdate(
      { subscription_id: subscriptionId },
      { status: "cancelled", isNotCancelled: false }
    );

    if (paymentDetails) {
      await paymentDetails.save();
    }

    return NextResponse.json({
      success: true,
      message: "Subscription cancellation scheduled at cycle end.",
      response,
      paymentDetails,
    });

  } catch (error: any) {
    console.error("Cancel Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
