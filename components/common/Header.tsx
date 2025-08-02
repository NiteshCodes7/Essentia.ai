"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import NavLink from "./nav-link";
import { LogOut } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PlanBadge from "./PlanBadge";
import { getUserPlan } from "@/lib/getUserPlan";

type User = {
  full_name: string;
  email: string;
  avatar?: string;
};

const uploadLimit: Record<string, number> = {
  free: 2,
  basic: 10,
  pro: Infinity,
};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [summaries, setSummaries] = useState<any[]>([]);
  const [limit, setLimit] = useState<number>(2);
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const res = await axios.post("/api/logout");
      if (res.status === 200) {
        setIsLoggedIn(false);
        setUser(null);
        toast(res.data.message);
        router.push("/sign-in");
        router.refresh();
      }
    } catch (error) {
      toast("❌ Failed to logout");
      console.error(error);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axios.get("/api/check-auth", {
          withCredentials: true,
        });
        if (res.status === 200 && res.data.loggedIn) {
          const email = res.data?.user?.email;
          const id = res.data?.user?._id;
          setUser(res.data.user);
          setIsLoggedIn(true);

          const summaryRes = await axios.post("/api/get-summary", { id });
          if (summaryRes.status === 200) {
            setSummaries(summaryRes.data?.summaries || []);
          }

          const userPlan = await getUserPlan(email);
          setLimit(uploadLimit[userPlan]);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.error("Error checking auth:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const getUserInitials = (full_name?: string) => {
    if (!full_name) return "👤";
    const names = full_name.trim().split(" ");
    return (names[0]?.[0] || "") + (names[1]?.[0] || "");
  };

  return (
    <nav className="container flex justify-between items-center py-4 lg:px-8 px-2 mx-auto">
      <div className="flex lg:flex-1">
        <NavLink href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={70}
            height={70}
            className="text-gray-900 hover:scale-105 transform transition-all"
          />
        </NavLink>
      </div>

      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href="/#pricing">Pricing</NavLink>
        {isLoggedIn && <NavLink href="/dashboard">Your Summaries</NavLink>}
      </div>

      <div className="flex lg:justify-end lg:flex-1">
        {isLoggedIn ? (
          <div className="flex items-center gap-5">
            {summaries.length < limit ? (
              <NavLink href="/upload" className="hidden md:block">
                Upload a PDF
              </NavLink>
            ) : (
              <NavLink href="/#pricing" className="hidden md:block">
                Upgrade
              </NavLink>
            )}

            <div className="hidden md:block">
              <PlanBadge />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="relative rounded-full w-10 h-10 bg-gray-200 text-black flex items-center justify-center overflow-hidden hover:bg-rose-50">
                  {user?.avatar ? (
                    <div className="absolute inset-0">
                      <Image
                        src={user.avatar}
                        alt="avatar"
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                  ) : (
                    getUserInitials(user?.full_name)
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem disabled className="text-bl cursor-default">
                  <div className="flex flex-col">
                    <p className="font-bold text-md">My Account</p>
                    <p className="text-xs">{user?.full_name}</p>
                    <p className="opacity-70 text-xs">{user?.email}</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="block md:hidden">
                  {summaries.length < limit ? (
                    <NavLink href="/upload" className="hidden md:block">
                      Upload a PDF
                    </NavLink>
                  ) : (
                    <NavLink href="/#pricing" className="hidden md:block">
                      Upgrade
                    </NavLink>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem className="block md:hidden">
                  <PlanBadge />
                </DropdownMenuItem>
                <DropdownMenuSeparator className="block md:hidden" />
                <DropdownMenuItem
                  variant={"destructive"}
                  onClick={handleLogOut}
                  className="text-red-600 cursor-pointer hover:bg-rose-50"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <NavLink href="/sign-in">Sign In</NavLink>
        )}
      </div>
    </nav>
  );
};

export default Header;
