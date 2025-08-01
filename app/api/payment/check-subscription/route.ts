import { NextRequest, NextResponse } from "next/server";
import { Payment } from "@/models/Payment.model";
import { connect } from "@/db/config";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    await connect();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "No email found" }, { status: 404 });
    }

    const latestPayment = await Payment.findOne({ user_email: email }).sort({ created_at: -1 });

    if (!latestPayment) {
      return NextResponse.json({ subscription: false });
    }

    const isNotCancelled = latestPayment.isNotCancelled;

    const razorpaySub = await razorpay.subscriptions.fetch(latestPayment.subscription_id);

    const isActive = razorpaySub.status === "active" || razorpaySub.status === "authenticated";
    const status = isActive ? "active" : "cancelled";

    const expiryUnix = isActive ? razorpaySub.current_end : razorpaySub.end_at || razorpaySub.ended_at;

    const expiryDate = expiryUnix
      ? new Date(expiryUnix * 1000).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null;

    return NextResponse.json(
      {
        subscription: isActive,
        subscribed: latestPayment,
        status,
        expiryUnix,
        expiryDate,
        isNotCancelled,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting user subscription:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
