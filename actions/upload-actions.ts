"use server";

import { generateSummary } from "@/lib/Gemini";
import { fetchAndExtractPdfText } from "@/lib/langchain";

export const generatePdfSummary = async (
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: {
          ufsUrl: string;
          name: string;
        };
      };
    }
  ]
) => {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File upload Failed",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { ufsUrl: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "File upload Failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);

    let summary;
    try {
      summary = await generateSummary(pdfText);

    } catch (error) {
      console.log(error);
    }

    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        summary,
      }
    };
  } catch (error) {
    console.error("Failed to generate summary with the provided AI", error);
  }
};