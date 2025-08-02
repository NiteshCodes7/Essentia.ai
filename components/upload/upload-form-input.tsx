"use client";

import React, { forwardRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { MotionDiv } from "@/components/common/motion-wrapper";
import { getUserPlan } from "@/lib/getUserPlan";
import axios from "axios";

type UploadFormInputProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

const uploadLimit: Record<string, number> = {
  free: 2,
  basic: 10,
  pro: Infinity,
};

const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
  ({ onSubmit, isLoading }, ref) => {
    const [summaries, setSummaries] = useState<any[]>([]);
    const [limit, setLimit] = useState<number>(2);

    useEffect(() => {
      const checkLoginStatus = async () => {
        try {
          const res = await axios.get("/api/check-auth", {
            withCredentials: true,
          });
          if (res.status === 200 && res.data.loggedIn) {
            const email = res.data?.user?.email;
            const id = res.data?.user?._id;

            const summaryRes = await axios.post("/api/get-summary", { id });
            if (summaryRes.status === 200) {
              setSummaries(summaryRes.data?.summaries || []);
            }

            const userPlan = await getUserPlan(email);
            setLimit(uploadLimit[userPlan]);
          }
        } catch (error) {
          console.error("Error in upload form:", error);
        }
      };

      checkLoginStatus();
    }, []);

    const isValid = summaries.length >= limit;
    return (
      <form onSubmit={onSubmit} ref={ref} className="flex flex-col gap-6">
        <MotionDiv
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          className="flex justify-end items-center gap-1.5"
        >
          <Input
            id="file"
            type="file"
            name="file"
            accept="application/pdf"
            required
          />
          <Button disabled={isValid || isLoading}>
            {isLoading ? (
              <>
                <Loader className="animate-spin" /> Processing...
              </>
            ) : (
              "Upload your PDF"
            )}
          </Button>
        </MotionDiv>
      </form>
    );
  }
);

UploadFormInput.displayName = "UploadFormInput";

export default UploadFormInput;
