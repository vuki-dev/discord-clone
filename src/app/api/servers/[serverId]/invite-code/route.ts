import { updateInviteCode } from "@/lib/db/server-querys";
import { getUserServerSide } from "@/lib/server-side-utils"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
    try {
        const user = await getUserServerSide();

        if(!user){
            return new NextResponse("Unauthorized", {status: 401})
        }

        if(!params.serverId){ 
            return new NextResponse("Server ID Missing", {status: 400})
        }

        const updated = await updateInviteCode(user.id, params.serverId)
        
        return NextResponse.json(updated);
    } 
    catch (err){
        console.log("SERVER_ID",err)
        return new NextResponse("Internal Error", {status: 500})
    }
}
