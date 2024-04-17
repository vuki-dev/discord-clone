import { userCreateServer } from "@/lib/db/server-querys";
import { getUserServerSide } from "@/lib/server-side-utils";
import { NextResponse } from "next/server";

import {v4 as uuidv4 } from "uuid";

export async function POST(req: Request){
    try{
        const {name, imageUrl} = await req.json();
        const user = await getUserServerSide();

        if(!user){
            return new NextResponse("Unauthorized", {status: 401});
        }
        
        const id = uuidv4();
        const inviteCode = uuidv4();

        const server = await userCreateServer(id, user.id, name, imageUrl, inviteCode);

        return NextResponse.json(server)
    } catch (err) {
        console.log("[SERVERS_POST]", err);
        return new NextResponse("Internal Error", {status: 500})
    }
}