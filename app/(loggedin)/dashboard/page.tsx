"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import BgGradient from "@/components/common/BgGradient";
import Header from "@/components/common/Header";
import SummaryCard from "@/components/summaries/summaries-card";
import { Button } from "@/components/ui/button";

export default function DashBoard() {
  const uploadLimit = 5;

  const [userId, setUserId] = useState<string | null>(null);
  const [summaries, setSummaries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authRes = await axios.get("/api/check-auth");
        if (authRes.status === 200) {
          const id = authRes.data?.user?._id;
          setUserId(id);

          const summaryRes = await axios.post("/api/get-summary", { id });
          if (summaryRes.status === 200) {
            setSummaries(summaryRes.data?.summaries || []);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <BgGradient className="form-emrald-200 via-teal-200 to-cyan-200" />
        <div className="container mx-auto flex flex-col gap-4">
          <div className="px-2 py-12 sm:py-24">
            <div className="flex gap-4 mb-8 justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent">
                  Your Summaries
                </h1>
                <p className="text-gray-600">
                  Transform your PDF's into concise, actionable insights
                </p>
              </div>
              <Button className="hidden md:block bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 transition-all duration-300 hover:no-underline">
                <Link href={"/upload"} className="flex">
                  <Plus />
                  New Summary
                </Link>
              </Button>
              <Button className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 transition-all duration-300 hover:no-underline md:hidden">
                <Link href={"/upload"} className="flex">
                  <Plus />
                </Link>
              </Button>
            </div>

            {summaries.length >= uploadLimit && (
              <div className="mb-6">
                <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800">
                  <p className="text-sm">
                    You've reached the limit of {uploadLimit} uploads on the
                    Basic Plan.{" "}
                    <Link
                      href={"/#pricing"}
                      className="text-rose-800 underline font-medium underline-offset-4 inline-flex items-center"
                    >
                      Click here to upgrade to Pro{" "}
                      <ArrowRight className="w-4 h-4 inline-block" />{" "}
                    </Link>
                    for unlimited uploads.
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
              {loading ? (
                <p>Loading...</p>
              ) : summaries.length === 0 ? (
                <p className="text-gray-600">No summaries yet.</p>
              ) : (
                summaries.map((summary, idx) => (
                  <SummaryCard
                    key={idx}
                    onDelete={(deletedId) => {
                      setSummaries((prev) =>
                        prev.filter((s) => s._id !== deletedId)
                      );
                    }}
                    summary={summary}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
