"use client";

import React, { useEffect, useState } from "react";
import PricingCard from "./PricingCard";
import { MotionDiv, MotionSection } from "@/components/common/motion-wrapper";
import { containerVariants, itemVariants } from "@/lib/constant";

export type Plan = {
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
    description: "For Study purposes",
    items: [
      "5 PDFs per month",
      "Standard processing speed",
      "Email Support",
      "Basic Plan – ₹99/month with duration of 3 months. Cancel anytime.",
    ],
    price: 99,
    priceId: "plan_QzjhUWcUutFRK7",
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
      "Pro Plan – ₹149/month with duration of 3 months. Cancel anytime.",
    ],
    price: 149,
    priceId: "plan_QzjkX1FGRHP7kA",
    paymentLink: "",
  },
];

export default function PricingSection() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative overflow-hidden"
      id="pricing"
    >
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <MotionDiv variants={itemVariants} className="text-center pb-12">
          <h2 className="uppercase font-bold text-xl mb-2 text-rose-500">
            Pricing
          </h2>
          <p className="text-muted-foreground">
            Choose the plan that fits your needs.
          </p>
        </MotionDiv>

        <MotionDiv variants={itemVariants} className="relative flex flex-col lg:flex-row justify-center items-stretch gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
