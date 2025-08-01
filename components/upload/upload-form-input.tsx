"use client";

import React, { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { MotionDiv } from "@/components/common/motion-wrapper";

type UploadFormInputProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
  ({ onSubmit, isLoading }, ref) => {
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
          <Button disabled={isLoading}>
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
