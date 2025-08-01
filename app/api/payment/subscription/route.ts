import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { connect } from "@/db/config";
import { Payment } from "@/models/Payment.model";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "@/models/User.model";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    await connect();

    const session = (await cookies()).get("session")?.value;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(session, process.env.JWT_SECRET!) as {
      id: string;
    };

    const user = await User.findById(decoded.id).select("email");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const email = user.email;

    const { priceId } = await req.json();

    const planDetails = await razorpay.plans.fetch(priceId);

    const amount = planDetails.item.amount as number;

    const subscription = await razorpay.subscriptions.create({
      plan_id: priceId,
      customer_notify: 1,
      total_count: 3,
    });


    const payment = await Payment.create({
      subscription_id: subscription.id,
      user_id: decoded.id,
      plan_id: priceId,
      user_email: email,
      amount: Math.round(amount / 100),
      currency: planDetails.item.currency,
      status: "created",
      type: "subscription",
      isNotCancelled: true,
    });

    await payment.save();

    return NextResponse.json({ success: true, subscription, planDetails, amount, email });
  } catch (err: any) {
    console.error("❌ Razorpay Subscription Creation Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Unexpected error" },
      { status: 500 }
    );
  }
}
