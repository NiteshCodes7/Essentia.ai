"use client";

import React, { useRef, useState } from "react";
import UploadFormInput from "@/components/upload/upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadThing";
import { toast } from "sonner";
import { CircleX } from "lucide-react";
import { generatePdfSummary } from "@/actions/upload-actions";
import axios from "axios";

const UploadForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("Upload completed.");
    },
    onUploadError: (err) => {
      console.error("Upload error:", err);
      toast("❌ Error occurred while uploading", {
        description: err.message,
        action: {
          label: <CircleX />,
          onClick: () => {},
        },
      });
    },
    onUploadBegin: (file) => {
      console.log("Uploading:", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      // ✅ Validate file
      const schema = z.object({
        file: z
          .instanceof(File, { message: "Invalid file" })
          .refine((f) => f.size <= 20 * 1024 * 1024, "Max size 20MB")
          .refine((f) => f.type === "application/pdf", "Must be a PDF"),
      });

      const validated = schema.safeParse({ file });

      if (!validated.success) {
        toast("❌ Invalid File", {
          description: validated.error.errors[0].message,
        });
        return;
      }

      toast("📤 Uploading PDF...", {
        description: "Hang tight while we upload your PDF.",
      });

      const uploadResponse = await startUpload([file]);
      if (!uploadResponse) {
        toast("❌ Upload Failed", {
          description: "Try using a different PDF.",
        });
        return;
      }

      const uploadedFile = uploadResponse[0];

      toast("📄 Generating Summary...", {
        description: "Our AI is processing your document.",
      });

      const summaryResult = await generatePdfSummary([uploadedFile]);
      const { data, message } = summaryResult || {};

      if (!data) {
        toast("❌ Summary Failed", {
          description: message || "Could not generate summary.",
        });
        return;
      }

      // ✅ Get logged-in user ID
      const authRes = await axios.get("/api/check-auth");
      const userId = authRes.data?.user?._id;
      if (!userId) {
        toast("❌ Authentication Error", {
          description: "User not logged in.",
        });
        return;
      }

      toast("💾 Saving to DB...", {
        description: "Saving your PDF summary to dashboard...",
      });

      // ✅ Save to MongoDB
      const saveRes = await axios.post("/api/save-summary", {
        user_id: userId,
        original_file_url: uploadedFile.ufsUrl,
        file_name: uploadedFile.name,
        title: uploadedFile.name.replace(".pdf", ""),
        summary_text: data.summary,
        status: "completed",
      });

      if (saveRes.data?.success) {
        toast("✅ Saved Successfully", {
          description: "View it in your dashboard.",
        });
        formRef.current?.reset();
      } else {
        toast("❌ Save Failed", {
          description: saveRes.data?.message || "Try again later.",
        });
      }

    } catch (error) {
      console.error("Upload error:", error);
      toast("❌ Unexpected Error", {
        description: "Check console for details.",
      });
      formRef.current?.reset();

    } finally {
      setIsLoading(false);
      formRef.current?.reset();
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UploadForm;
