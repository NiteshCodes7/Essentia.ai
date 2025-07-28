import { cn } from "@/lib/utils";
import React from "react";

const ProgressBar = ({
  sections,
  currentSection,
}: {
  sections: Array<{ title: string; points: string[] }>;
  currentSection: number;
}) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-xs pt-4 pb-2 border-b border-rose-50/10">
      <div className="px-4 flex gap-1.5">
        {sections.map((_, index) => (
          <div key={index} className="h-1.5 flex-1 rounded-full bg-rose-500/10 overflow-hidden">
            <div
              className={cn(
                "h-full bg-linear-to-r from-gray-500 to-rose-600 rounded-full transition-all duration-200",
                index === currentSection
                  ? "w-full"
                  : currentSection > index
                  ? "w-full opacity-10"
                  : "w-0"
              )}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
