import React from "react";
import { Card } from "@/components/ui/card";
import DeleteButton from "./DeleteButton";
import Link from "next/link";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { MotionDiv } from "@/components/common/motion-wrapper";
import { itemVariants } from "@/lib/constant";

type SummaryCardProps = {
  summary: {
    _id: string;
    title: string;
    file_name: string,
    created_at: string;
    summary_text: string;
    status: string;
  };
  onDelete: (id: string) => void;
};

const SummaryHeader = ({
  file_name,
  title,
  created_at,
}: {
  file_name: string
  title: string | null;
  created_at: string;
}) => {
  return (
    <div className="flex items-start gap-2 sm:gap-4">
      <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400 mt-1" />
      <div className="flex-1 min-w-0">
        <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5">
          {title || file_name.replace(".pdf", "")}
        </h3>
        <p className="text-sm text-gray-500">{formatDistanceToNow(new Date(created_at), { addSuffix: true })}</p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <div
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-full capitalize",
        status === "completed"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      )}
    >
      {status}
    </div>
  );
};

const SummaryCard = ({ summary, onDelete }: SummaryCardProps) => {
  return (
    <MotionDiv
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 , ease: 'easeOut' }
      }}
    >
      <Card className="relative h-full">
        <div className="absolute top-2 right-2">
          <DeleteButton onDelete={onDelete} id={summary._id} />
        </div>
        <Link href={`summaries/${summary._id}`} className="block p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <SummaryHeader
              file_name={summary.file_name}
              title={summary.title}
              created_at={summary.created_at}
            />

            <p className="text-gray-600 line-clamp-2 text-sm sm:text-base pl-2">
              {summary.summary_text}
            </p>
          </div>
          <div className="flex justify-between items-center mt-2 sm:mt-4">
            <StatusBadge status={summary.status} />
          </div>
        </Link>
      </Card>
    </MotionDiv>
  );
};

export default SummaryCard;
