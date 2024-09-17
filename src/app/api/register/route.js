import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password, name } = await req.json();
    console.log(email, password, name);
    return NextResponse.json({ message: "success", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error in server side", status: 500 });
  }
}
