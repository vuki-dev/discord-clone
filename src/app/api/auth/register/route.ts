import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { registerFormSchema } from "@/lib/validation";
import { registerProfile, getProfileId } from "@/lib/db-querys";
import { createToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await registerFormSchema.parseAsync(
      await req.json()
    )

    const hashedPassword = await bcrypt.hash(password, 5);

    await registerProfile(username, email, hashedPassword);
    const profileId = await getProfileId(email);
    console.log(profileId);

    return new NextResponse("Registered successfully", { status: 200 });
  } catch (error) {
    console.log("[REGISTER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}