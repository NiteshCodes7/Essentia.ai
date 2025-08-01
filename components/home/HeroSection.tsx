import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionSection,
} from "@/components/common/motion-wrapper";
import {
  buttonVariants,
  containerVariants,
  itemVariants,
} from "@/lib/constant";

const HeroSection = () => {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative mx-auto flex flex-col z-0 items-center justify-center mt-6 py-16 sm:py-12 lg:pb-36 transition-all animate-in lg:px-12 max-w-7xl md:h-screen"
    >
      <MotionDiv
        variants={itemVariants}
        animate="active"
        className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group"
      >
        <Badge
          variant={"secondary"}
          className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-rose-50 transition-colors duration-200"
        >
          <Sparkles className="w-6 h-6 mr-2 text-rose-600 animate-pulse" />
          <p className="text-base text-rose-600">Powered by AI</p>
        </Badge>
      </MotionDiv>
      <MotionH1 variants={itemVariants} className="font-bold py-6 text-center">
        Transform PDFs into{" "}
        <span className="relative inline-block">
          <span className="relative px-2 z-10">concise</span>
          <span
            className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transforn -skew-y-1"
            aria-hidden="true"
          ></span>{" "}
        </span>{" "}
        summaries
      </MotionH1>
      <MotionH2
        variants={itemVariants}
        whileHover="hover"
        whileTap="tap"
        className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600"
      >
        Get a beautiful summary reel of the document in seconds.
      </MotionH2>
      <MotionDiv
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
      >
        <Button
          variant={"link"}
          className="relative overflow-hidden text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 bg-gradient-to-r from-rose-500 to-slate-900 hover:from-slate-900 hover:to-rose-500 font-bold transition-all duration-300"
        >
          <Link
            href={"/#pricing"}
            className="flex gap-2 items-center z-10 relative"
          >
            <span>Try Essentia.ai</span>
            <ArrowRight className="animate-pulse" />
          </Link>
        </Button>
      </MotionDiv>
    </MotionSection>
  );
};

export default HeroSection;
