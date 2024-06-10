import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { registerUser, getUserId, emailInUseCheck } from "@/lib/db/db-queries";
import { createToken } from "@/lib/auth";
import { registerFormSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await registerFormSchema.parseAsync(
      await req.json()
    )
    
    const emailCheck = await emailInUseCheck(email);
    
    const hashedPassword = await bcrypt.hash(password, 5);
    
    await registerUser(username, email, hashedPassword);
    console.log("proslo")
    const userId = await getUserId(email);
    const token = await createToken(userId);

    return new NextResponse("Registered successfully", { status: 200, headers: { 'Set-Cookie': `token=${token}; Path=/; Expires=${24*60*60}`} });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(`${error.message}`, { status: 500 });
    } else {
      return new NextResponse("Internal server error", { status: 500 });
    }
  }
}