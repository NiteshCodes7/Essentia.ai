import { connect } from "@/db/config";
import { PdfSummary } from "@/models/PdfSummary.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const body = await req.json();
    const _id = body.id;

    if(!_id){
       return NextResponse.json(
        { error: "Summary ID is required" },
        { status: 400 }
      );
    }

    await PdfSummary.deleteOne({ _id });

    return NextResponse.json({ message: "Success" }, { status: 200 });

  } catch(err){
    console.log(err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}