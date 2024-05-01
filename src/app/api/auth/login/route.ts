import { createToken } from "@/lib/auth";
import { userLogin } from "@/lib/db/db-queries";
import { loginFormSchema } from "@/lib/validation";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const {email, password} = await req.json();
        const user = await userLogin(email, password);
        const userId = user.id;
        const token = await createToken(userId);
        
        return new NextResponse("Logged in successfully", { status: 200, headers: { 'Set-Cookie': `token=${token}; Path=/; Expires=${24*60*60}`} });
    } catch (err) {
        if (err instanceof Error) {
            return new NextResponse(`${err.message}`, { status: 500 });
          } else {
            return new NextResponse("Internal server error", { status: 500 });
        }
    }
    

}