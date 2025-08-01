import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/config";
import { Payment } from "@/models/Payment.model";
import { updateSubscriptionStatus } from "@/lib/updateSubscriptionStatus";
import getRawBody from "raw-body";

export async function POST(req: NextRequest) {
  await connect();

  // Get raw body and headers
  const rawBody = await getRawBody(req.body as any);
  const signature = req.headers.get("x-razorpay-signature");

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;
  if (!signature || !webhookSecret) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Verify signature
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");

  if (expectedSignature !== signature) {
    console.error("❌ Webhook signature mismatch");
    return new NextResponse("Invalid signature", { status: 400 });
  }

  // Parse event body
  const eventBody = JSON.parse(rawBody.toString("utf-8"));
  const event = eventBody.event;

  try {
    // 🎯 Handle Subscription Events
    if (event === "subscription.activated") {
      const subscription = eventBody.payload.subscription.entity;
      await updateSubscriptionStatus(subscription.id, "active");
    }

    if (event === "subscription.cancelled") {
      const subscription = eventBody.payload.subscription.entity;
      await updateSubscriptionStatus(subscription.id, "cancelled");
    }

    if (event === "subscription.completed") {
      const subscription = eventBody.payload.subscription.entity;
      await updateSubscriptionStatus(subscription.id, "expired");
    }

    // 🎯 Handle Payment Failure
    if (event === "payment.failed") {
      const payment = eventBody.payload.payment.entity;

      await Payment.findOneAndUpdate(
        { razorPay_payment_id: payment.id },
        {
          status: "failed",
          reason: payment.error_description || "Unknown",
          failed_at: new Date(),
        }
      );
    }

    return new NextResponse("Webhook processed", { status: 200 });
  } catch (error) {
    console.error("❌ Error processing webhook:", error);
    return new NextResponse("Error processing webhook", { status: 500 });
  }
}
