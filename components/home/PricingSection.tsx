import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Plan = {
  id: string;
  name: string;
  description: string;
  items: string[];
  price: number;
  priceId: string;
  paymentLink: string;
};

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "",
    items: ["5 PDFs per month", "Standard processing speed", "Email Support"],
    price: 5,
    priceId: "",
    paymentLink: "",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For Professionals and Teams",
    items: [
      "unlimited PDF summaries",
      "Priority Processing",
      "24/7 priority support",
      "Markdown support",
    ],
    price: 12,
    priceId: "",
    paymentLink: "",
  },
];

const PricingSection = () => {
  return (
    <section className="relative overflow-hidden" id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="text-center pb-12">
          <h2 className="uppercase font-bold text-xl mb-2 text-rose-500">
            Pricing
          </h2>
          <p className="text-muted-foreground">
            Choose the plan that fits your needs.
          </p>
        </div>

        <div className="relative flex flex-col lg:flex-row justify-center items-stretch gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({
  id,
  name,
  description,
  items,
  price,
  priceId,
  paymentLink,
}: Plan) => {
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
            <p className="text-lg lg:text-xl font-bold capitialize">{name}</p>
            <p className="text-base-content/80 mt-2 ">{description}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <p className="text-5xl font-extrabold tracking-tight">${price}</p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs uppercase font-semibold">USD</p>
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

        <div>
          <div className="space-y-2 flex justify-center w-full">
            <Link
              href={paymentLink}
              className={cn(
                "w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800  to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2",
                id === "pro"
                  ? "border-rose-900"
                  : "border-rose-100 from-rose-400 to-rose-500"
              )}
            >
              Buy Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
