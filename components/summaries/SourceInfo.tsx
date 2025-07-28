import { ExternalLink, FileText } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import DownloadSummaryButton from "./DownloadSummaryButton";

const SourceInfo = ({
  file_name,
  original_file_url,
  title,
  summary_text,
  created_at,
}: {
  file_name: string;
  original_file_url: string;
  title: string;
  summary_text: string;
  created_at: Date;
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center justify-center gap-2">
        <FileText className="h-4 w-4 text-rose-400" />
        <span>Source: {file_name}</span>
      </div>
      <div className="flex gap-2">
        <Button
          variant={"ghost"}
          size={"sm"}
          className="h-8 px-3 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
          asChild
        >
          <a href={original_file_url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-1" />
            View Original
          </a>
        </Button>

        <DownloadSummaryButton
          title={title}
          summary_text={summary_text}
          file_name={file_name}
          created_at={created_at}
         />
      </div>
    </div>
  );
};

export default SourceInfo;
