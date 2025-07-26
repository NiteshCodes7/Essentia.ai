import { connect } from "@/db/config";
import { PdfSummary } from "@/models/PdfSummary.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const body = await req.json();

    const existing = await PdfSummary.findOne({
      user_id: body.user_id,
      file_name: body.file_name,
    });

    if (existing) {
      return NextResponse.json({
        success: false,
        message: "File already uploaded.",
      }, { status: 409});
    }

    const summary = await PdfSummary.create({
      user_id: body.user_id,
      original_file_url: body.original_file_url,
      file_name: body.file_name,
      title: body.title,
      summary_text: body.summary_text,
      status: body.status,
    });

    return NextResponse.json({ success: true, data: summary }, { status: 200 });
  } catch (error) {
    console.error("DB save error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save to DB." },
      { status: 500 }
    );
  }
}
