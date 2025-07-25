"use client";

import React from "react";
import UploadFormInput from "@/components/upload/upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadThing";
import { toast } from "sonner";
import { CircleX } from "lucide-react";

const UploadForm = () => {
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("error occurred while uploading", err);
      toast("❌ Error occured while uploading", {
        description: err.message,
        action: {
          label: <CircleX />,
          onClick: () => {},
        },
      });
    },
    onUploadBegin: (file) => {
      console.log("upload has begun for", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fromData = new FormData(e.currentTarget);
    const file = fromData.get("file") as File;

    const schema = z.object({
      file: z
        .instanceof(File, { message: "Invalid file" })
        .refine(
          (file) => file.size <= 20 * 1024 * 1024,
          "File size should be less than 20MB"
        )
        .refine(
          (file) => file.type.startsWith("application/pdf"),
          "File must be a PDF"
        ),
    });

    const validatedFields = schema.safeParse({ file });
    toast("📄 Uploading PDF", {
      description: "Hang tight! you PDF is uploading...",
      action: {
        label: <CircleX />,
        onClick: () => {},
      },
    });

    console.log(validatedFields);

    if (!validatedFields.success) {
      toast("❌ Something went wrong.", {
        description: "Invalid file",
        action: {
          label: <CircleX />,
          onClick: () => {},
        },
      });
      console.log(
        validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
      );
      return;
    }

    const resp = await startUpload([file]);
    if (!resp) {
      toast("❌ Something went wrong", {
        description: "Please use a different file",
        action: {
          label: <CircleX />,
          onClick: () => {},
        },
      });
      return;
    }

    toast("📄 Processing PDF", {
      description: "Hang tight! Our AI is reading through your document...",
      action: {
        label: <CircleX />,
        onClick: () => {},
      },
    });
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
};

export default UploadForm;
