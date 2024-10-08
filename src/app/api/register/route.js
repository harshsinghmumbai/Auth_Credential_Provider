import { ConnectMongodb } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password, name } = await req.json();
    await ConnectMongodb();
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashPassword, name });
    return NextResponse.json({ message: "success", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error in server side", status: 500 });
  }
}
