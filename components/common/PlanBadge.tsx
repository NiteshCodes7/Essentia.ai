import axios from "axios";
import { Crown, Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PlanBadge = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "checking" | "no-email" | "active" | "cancelled" | "none"
  >("checking");
  const [planType, setPlanType] = useState<"basic" | "pro" | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [expiryDate, setExpiryDate] = useState<string | null>(null);
  const [isNotCancelled, setIsNotCancelled] = useState<boolean | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/api/check-auth");
        if (res.data?.user?.email) {
          setEmail(res.data.user.email);
        } else {
          setStatus("no-email");
        }
      } catch (err) {
        console.error("Failed to get user:", err);
        setStatus("no-email");
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!email || email.trim() === "") {
        setStatus("no-email");
        return;
      }

      try {
        const res = await axios.post("/api/payment/check-subscription", {
          email,
        });

        if (res.data.subscription === true) {
          setStatus(res.data.status);
          setPlanType(res.data.subscribed.price_id);
          setSubscriptionId(res.data.subscribed.subscription_id);
          setExpiryDate(res.data.expiryDate);
          setIsNotCancelled(res.data.isNotCancelled);
        } else {
          setStatus("none");
        }
      } catch (error) {
        console.error("Failed to fetch subscription:", error);
        setStatus("none");
      }
    };

    fetchSubscription();
  }, [email]);

  const handleCancel = async () => {
    try {
      const res = await axios.post("/api/payment/cancel", { subscriptionId });
      setStatus("cancelled");
      setIsNotCancelled(res.data.paymentDetails.isNotCancelled);
    } catch (error) {
      console.error("Cancellation failed:", error);
    } finally {
      setDialogOpen(false);
    }
  };

  if (status === "no-email" || status === "none") {
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Badge
          variant="outline"
          className="ml-2 px-2.5 py-1.5 bg-rose-50 border border-rose-300 text-rose-600 hover:bg-rose-100 transition-all duration-200 flex items-center gap-1.5 font-semibold rounded-md cursor-pointer"
        >
          <Crown className="w-3.5 h-3.5" />
          Free Trial
          <Image
            src="/assets/dropdown.png"
            alt="dropdown"
            width={8}
            height={8}
            className="ml-1 text-rose-600"
          />
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="p-3 text-sm text-rose-600 bg-white border border-rose-200 rounded-md shadow-lg w-[240px]"
      >
        <span>
          You're on a Free Trial.
          <br />
          <Link
            href="/#pricing"
            onClick={() => setOpen(!open)}
            className="underline font-semibold text-rose-600 hover:text-rose-700 transition"
          >
            Upgrade your plan
          </Link>
        </span>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

  if (status === "active" || status === "cancelled") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Badge
            variant="outline"
            className="ml-2 px-2 py-1 bg-amber-100 border-amber-300 flex items-center font-semibold text-sm cursor-pointer"
          >
            <Crown className="w-3 h-3 mr-1 text-amber-600" />
            {planType === "pro" ? "Pro" : "Basic"}{" "}
            <Image
              src="/assets/dropdown.png"
              alt="dropdown"
              width={5}
              height={5}
              className="ml-1"
            />
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="p-3 flex flex-col gap-2">
          {expiryDate && (
            <DropdownMenuItem className="font-medium text-sm bg-transparent hover:bg-transparent focus:bg-transparent cursor-default">
              {status === "active" && isNotCancelled
                ? "Renews on: "
                : "Expires on: "}{" "}
              {expiryDate}
            </DropdownMenuItem>
          )}

          {status === "active" && isNotCancelled && (
            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-transparent text-red-600 hover:bg-rose-100"
                >
                  Cancel subscription
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to cancel your subscription?
                  </AlertDialogTitle>
                  <p className="font-extralight">
                    <em>
                      If you cancel your subscription, you will still have
                      access to premium features until the end of your current
                      billing cycle. No further payments will be charged.
                    </em>
                  </p>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="hover:bg-transparent">
                    Never mind
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleCancel}>
                    Yes, cancel
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Badge
      variant="outline"
      className="ml-2 px-2 py-1 bg-gray-100 border-gray-300 flex items-center font-semibold text-sm"
    >
      <Loader className="h-3 w-3 text-gray-600 animate-spin" /> Checking...
    </Badge>
  );
};

export default PlanBadge;
