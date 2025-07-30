import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import getRawBody from "raw-body";
import { Payment } from "@/models/Payment.model";

export async function POST(req: NextRequest) {
  const rawBody = await getRawBody(req.body as any);

  const razorpaySignature = req.headers.get("x-razorpay-signature");
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;

  // Generate expected signature
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");

  // Verify signature
  if (expectedSignature !== razorpaySignature) {
    console.error("❌ Webhook signature mismatch!");
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const bodyJson = JSON.parse(rawBody.toString("utf-8"));

  if (bodyJson.event === "payment.captured") {
    const paymentDetails = bodyJson.payload.payment.entity;

    const payment = await Payment.findOneAndUpdate(
      { id: paymentDetails.order_id },
      {
        status: "captured",
        captured_at: new Date(),
      }
    );

    await payment.save();
  }

  if(bodyJson.event === "payment.failed"){
    const paymentFailedDetails = bodyJson.payload.entity.order_id;

    const payment = await Payment.findByIdAndUpdate(
        { id: paymentFailedDetails.order_id },
        {
            status: "failed",
            reason: paymentFailedDetails.error_description || "Unknown failure",
            failed_at: new Date(),
        }
    )

    await payment.save();
  }

  return new NextResponse("Webhook received", { status: 200 });
}
