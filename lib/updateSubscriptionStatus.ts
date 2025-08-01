import { Payment } from "@/models/Payment.model";

export async function updateSubscriptionStatus(id: string, status: string) {
  await Payment.findOneAndUpdate(
    { id: id },
    { status: status, updatedAt: new Date() }
  );
}
