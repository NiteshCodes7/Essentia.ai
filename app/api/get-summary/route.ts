import { connect } from "@/db/config";
import { PdfSummary } from "@/models/PdfSummary.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const body = await req.json();
    const userId = body?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const summaries = await PdfSummary.find({ user_id: new mongoose.Types.ObjectId(userId), }).sort({createdAt: -1,});

    return NextResponse.json({ summaries }, { status: 200 });

  } catch (error) {
    console.error("Error fetching summary:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
