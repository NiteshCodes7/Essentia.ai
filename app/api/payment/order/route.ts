import { Payment } from "@/models/Payment.model";
import { User } from "@/models/User.model";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import jwt from "jsonwebtoken";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  const session = (await cookies()).get("session")?.value;

  if (!session) {
    return NextResponse.json({ message: "Not LoggedIn" }, { status: 401 });
  }

  const decoded = jwt.verify(session, process.env.JWT_SECRET!) as {
    id: string;
  };

  const user = await User.findById(decoded.id).select("email");

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const email = user.email;

  const { amount, currency, priceId } = await req.json();

  const options = {
    amount: amount * 100, // amount in paise
    currency: currency || "INR",
    receipt: `receipt_order_${Date.now()}`,
    notes: {
      priceId: priceId,
    },
  };

  try {
    const order = await razorpay.orders.create(options);

    const payment = await Payment.create({
      id: order.id,
      email: email,
      amount,
      status: "pending",
    });

    await payment.save();

    return NextResponse.json({ order, email }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
