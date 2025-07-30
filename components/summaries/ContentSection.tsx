import React from "react";

const ContentSection = ({
  title,
  points,
}: {
  title: string;
  points: string[];
}) => {
  return (
    <div className="space-y-4">
      {points.map((point, idx) => (
        <div
          key={`${point}-${idx}`}
          className="p-4 bg-gradient-to-br from-gray-200/[0.08] to-gray-200/[0.03] rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
        >
          <p className="text-sm">
            {point.startsWith("•") ? point.replace("•", "").trim() : point}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ContentSection;
