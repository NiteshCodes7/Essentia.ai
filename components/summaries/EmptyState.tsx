import { FileText } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const EmptyState = () => {
  return (
    <div className="text-center py-12">
      <div className="flex flex-col items-center gap-4">
        <FileText className="w-16 h-16 text-gray-400" />
        <h3 className="text-xl font-semibold text-gray-600">No summaries yet</h3>
        <p className="text-gray-500 max-w-md">Upload your first PDF to get started with AI-Powered summaries</p>
        <Link href={"/upload"}>
          <Button
            variant={"link"}
            className="mt-4 text-white bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:no-underline"
          >
            Create your first summary
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;
