import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try{
        await cookies().delete('token');
        return new NextResponse("Success", {status: 200})
    } catch (err) {
        return new NextResponse("Internal Error", {status: 500})
    }
}