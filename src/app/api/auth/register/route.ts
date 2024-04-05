import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const {username, email, password} = await req.json();
        const query = `INSERT INTO profile (name, email, password) VALUES (?, ?, ?)`
        db.query(query, [username, email, password], (err, result) => {
            if (err) {
                throw new Error(err.message)
            } else {
                console.log('Data inserted into MySQL successfully');
            }
        });

        return new NextResponse("Registered successfully", { status: 200 });
    } catch(error) {
        console.log('[REGISTER_POST]', error);
        return new NextResponse("Internal Error", {status: 500})
    }
}