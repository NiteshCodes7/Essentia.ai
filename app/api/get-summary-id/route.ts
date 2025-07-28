import { connect } from "@/db/config";
import { PdfSummary } from "@/models/PdfSummary.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const body = await req.json();
    const _id = body?.id

    if (!_id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    const summary = await PdfSummary.findById(_id);

    if(!summary){
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 404 }
      );
    }

    return NextResponse.json({ summary }, { status: 200 });

  } catch (error) {
    console.error("Error fetching summary:", error); 
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}