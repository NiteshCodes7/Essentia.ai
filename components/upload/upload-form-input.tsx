"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UploadFormInput = ({
  onSubmit,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="flex justify-end items-center gap-1.5">
            <Input
                id="file"
                type="file"
                name="file"
                accept="application/pdf"
                required
                className=""
            />
            <Button>Upload your PDF</Button>
        </div>
    </form>
  );
};

export default UploadFormInput;
