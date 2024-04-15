import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { registerProfile, getProfileId, emailInUseCheck } from "@/lib/db/db-querys";
import { createToken } from "@/lib/auth";
import { registerFormSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await registerFormSchema.parseAsync(
      await req.json()
    )
    
    const emailCheck = await emailInUseCheck(email);

    const hashedPassword = await bcrypt.hash(password, 5);

    await registerProfile(username, email, hashedPassword);
    const profileId = await getProfileId(email);
    const token = await createToken(profileId);

    return new NextResponse("Registered successfully", { status: 200, headers: { 'Set-Cookie': `token=${token}; Path=/; Expires=${24*60*60}`} });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(`${error.message}`, { status: 500 });
    } else {
      return new NextResponse("Internal server error", { status: 500 });
    }
  }
}