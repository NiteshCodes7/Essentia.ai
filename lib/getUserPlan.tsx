import axios from "axios";


export async function getUserPlan(email: string): Promise<"free" | "basic" | "pro"> {
  try {
    const res = await axios.post("/api/payment/check-subscription", { email });
    const { subscription, status, expiryUnix, subscribed } = res.data;

    const now = Math.floor(Date.now() / 1000);
    const notExpired = expiryUnix && expiryUnix > now;

    let plan: "free" | "basic" | "pro" = "free";

    if (subscription) {
      plan = subscribed?.plan_id?.includes("basic") ? "basic" : "pro";
    } else if (status === "cancelled" && notExpired) {
      plan = subscribed?.plan_id?.includes("basic") ? "basic" : "pro";
    }

    return plan;
  } catch (error) {
    console.error("Error in getUserPlan:", error);
    return "free";
  }
}
