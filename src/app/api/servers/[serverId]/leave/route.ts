import { leaveServer } from "@/lib/db/server-queries";
import { getServerFull, getUserServerSide } from "@/lib/server-side-utils"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, {params}:{params: {serverId: string}}){
    try {
        const user = await getUserServerSide();

        if(!user){
            return new NextResponse("Unauthorized",{status: 500});
        }

        if(!params.serverId){
            return new NextResponse("Server id missing", {status: 400});
        }

        await leaveServer(params.serverId, user.id);

        return new NextResponse("Success", {status: 200})
    } catch (err) {
        console.log("[SERVER_ID_LEAVE]", err)
        return new NextResponse("Internal Error", {status: 500})
    }
}