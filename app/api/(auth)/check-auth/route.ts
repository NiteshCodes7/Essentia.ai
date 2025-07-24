import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { User } from "@/models/User.model";
import jwt from "jsonwebtoken";

export async function GET() {
  const token = (await cookies()).get("session")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const user = await User.findById(decoded.id).select("full_name email");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User found", loggedIn: true, user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
