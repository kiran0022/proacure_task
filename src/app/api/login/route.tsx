import User from "@/models/userModel";
import { connectDB } from "@/utils/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const res = await req.json();

  console.log(res);
  const email = await res.email;
  await connectDB();

  const user: any = await User.find({ email });
  console.log(user);
  let verified_user;
  if (res.email === user.email) {
    res.password === user.password;
    verified_user = user;
  }

  return NextResponse.json(verified_user);
}
