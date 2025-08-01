import { cn } from "@/lib/utils";
import axios from "axios";
import { CheckIcon, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plan } from "./PricingSection";

export default function PricingCard({
  id,
  name,
  description,
  items,
  price,
  priceId,
  paymentLink,
}: Plan) {
  const router = useRouter();

  const handlePayment = async () => {
    try {
      const res = await axios.post("/api/payment/subscription", {
        priceId: priceId,
      });

      const subscription = res.data.subscription;
      const planDetails = res.data.planDetails;
      const email = res.data.email;
      const amount = res.data.amount;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        subscription_id: subscription.id,
        amount: amount,
        currency: planDetails.item.currency,
        name: "Essentia.AI",
        description: `${name} Plan – ₹${amount}/month for 3 months. Cancel anytime.`,

        image: "/assets/logo.png",
        handler: async function (response: any) {
          await axios.post("/api/payment/verify", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_subscription_id: response.razorpay_subscription_id,
            razorpay_signature: response.razorpay_signature,
            email: email,
            price_id: id,
          });
          toast.success("Payment successful! 🎉");
          router.push("/dashboard");
        },
        theme: { color: "#F84E7F" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.warning("Please log in to continue.");
        router.push("/sign-in");
      } else {
        console.error("Unexpected error:", error);
        toast.error("Something went wrong! Try again.");
      }
    }
  };

  return (
    <div className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300">
      <div
        className={cn(
          "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl",
          id === "pro" && "border-rose-500 gap-5 border-2"
        )}
      >
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base-content/80 mt-2 ">{description}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <p className="text-5xl font-extrabold tracking-tight">₹{price}</p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs uppercase font-semibold">Rupees</p>
            <p className="text-xs">/month</p>
          </div>
        </div>

        <div className="space-y-2.5 leading-relaxed text-base flex-1">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckIcon size={18} />
              <span>{item}</span>
            </li>
          ))}
        </div>

        <div className="space-y-2 flex justify-center w-full">
          <Button
            onClick={handlePayment}
            className={cn(
              "w-full rounded-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2",
              id === "pro" ? "border-rose-900" : "border-rose-100"
            )}
          >
            Buy Now <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}