import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { Payment } from "@/models/Payment.model";
import { connect } from "@/db/config";
import { sendOtpEmail } from "@/lib/sendOTP";

export async function POST(req: NextRequest) {
  await connect();

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    email,
    price_id,
  } = await req.json();

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body.toString())
    .digest("hex");

  const isValid = expectedSignature === razorpay_signature;

  if (isValid) {
    const payment = await Payment.findOneAndUpdate(
      { id: razorpay_order_id },
      {
        status: "captured",
        price_id: price_id,
      },
      { new: true }
    );

    await payment.save();

    sendOtpEmail(email, "", razorpay_payment_id, price_id);

    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json(
      { success: false, error: "Invalid Signature" },
      { status: 400 }
    );
  }
}
