import { ConnectMongodb } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();
    await ConnectMongodb();
    const user = await User.findOne({ email });
    console.log("user in server side", user);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: "error in server side", status: 500 });
  }
}
