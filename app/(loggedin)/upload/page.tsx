"use client";

import BgGradient from "@/components/common/BgGradient";
import Header from "@/components/common/Header";
import { MotionDiv } from "@/components/common/motion-wrapper";
import UploadForm from "@/components/upload/upload-form";
import UploadHeader from "@/components/upload/upload-header";
import { containerVariants } from "@/lib/constant";
import React from "react";

const page = () => {
  return (
    <>
      <Header />
      <section className="min-h-screen">
        <BgGradient />
        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8"
        >
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <UploadHeader />
            <UploadForm />
          </div>
        </MotionDiv>
      </section>
    </>
  );
};

export default page;
