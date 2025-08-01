import { Pizza } from "lucide-react";
import React from "react";
import SummaryViewer from "../summaries/SummaryViewer";
import { MotionDiv, MotionH3 } from "@/components/common/motion-wrapper";

const summary = `
# 📁 Instant File Summarizer

• 🪄 Quickly transform uploaded documents into easy-to-read summaries
• 📌 Designed to simplify content, save time, and boost productivity

# Document Details

• 📄 Type: App Demo Metadata
• 👥 For: Users summarizing uploaded files

# Key Highlights

• ✍️ Tracks file name, word count, and upload date automatically
• 💡 Summarizes documents using AI-generated digest text
• 🧠 Provides direct access to original files via URL

# Why It Matters

• 🌍 This demo showcases how your app makes it effortless to extract key insights from large documents — ideal for students, professionals, and content creators who need information fast.

# Main Points

• 🔍 Every file is uniquely identified and timestamped
• 🧩 All file data and summaries are stored together for easy retrieval
• 📈 Helps users distill lengthy content into key takeaways instantly

# Pro Tips

• 🛠️ Use summaries as preview content in social or internal tools
• 💎 Include word count to estimate reading or processing time
• 🎯 Make use of original file links for source verification and sharing

# Key Terms to Know

• 🧠 summary_text: The auto-generated summary of the document
• 🧠 created_at: When the file was uploaded and processed

# Bottom Line

• 🧵 This demo illustrates the core value of your app: turning documents into digestible, useful insights in seconds
`;

const DemoSection = () => {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 mb-4">
            <Pizza className="w-6 h-6 text-rose-500" />
          </div>
          <div className="text-center mb-16">
            <MotionH3
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6"
            >
              Watch how Essentia.ai transforms{" "}
              <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
                this Next.js course
              </span>{" "}
              PDF into an easy to read summary!
            </MotionH3>
          </div>

          <MotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center px-2 sm:px-4 lg:px-6"
          >
            <SummaryViewer summary={summary} />
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
