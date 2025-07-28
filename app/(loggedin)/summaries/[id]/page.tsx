"use client";

import Header from "@/components/common/Header";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { FileText, Loader } from "lucide-react";
import BgGradient from "@/components/common/BgGradient";
import SummaryHeader from "@/components/summaries/summary-header";
import SourceInfo from "@/components/summaries/SourceInfo";
import SummaryViewer from "@/components/summaries/SummaryViewer";

type Status = {
  _id: string;
  title: string;
  original_file_url: string;
  summary_text: string;
  file_name: string;
  word_count: number;
  created_at: Date;
};


const SummaryPage = () => {
  const params = useParams();
  const id = params?.id as string;
  
  const [summary, setSummary] = useState<Status | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getSummary = async () => {
      try {
        const res = await axios.post("/api/get-summary-id", { id });
        if (res.data?.summary) {
          setSummary(res.data.summary);
        } else {
          router.push("/404");
        }
      } catch (error) {
        console.log("Error fetching summary:", error);
        router.push("/404");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) getSummary();
  }, [id, router]);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className=" flex items-center justify-center h-[50vh] gap-3">
          <Loader className="animate-spin" />
          Loading summary...
        </div>
      </>
    );
  }

  if (!summary) return null;

  const { title, original_file_url, summary_text, file_name, word_count, created_at } = summary;

  const reading_time = Math.ceil((word_count || 0) / 200);


  return (
    <>
      <Header />
      <div className="relative isolate min-h-screen bg-linear-to-r from-rose-50/40 to-white">
        <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />
        <div className="container mx-auto flex flex-col gap-4">
          <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
            <div className="flex flex-col">
              {/* Summary Header */}
              <SummaryHeader title={title} created_at={created_at} reading_time={reading_time} />
            </div>
            {/* SourceInfo */}
            {file_name && <SourceInfo file_name={file_name} original_file_url={original_file_url} title={title} summary_text={summary_text} created_at={created_at} />}
          </div>
          <div className="relative mt-4 sm:mt-8">
            <div className="relative p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30 transition-all duration-300 hover:shadow-2xl hover:bg-white/90 max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-50 rounded-2xl sm:rounded-3xl" />

              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xs">
                <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-rose-400" />
                {word_count} words
              </div>

              <div className="relative mt-8 sm:mt-6 flex justify-center">
                <SummaryViewer summary={summary_text} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryPage;
