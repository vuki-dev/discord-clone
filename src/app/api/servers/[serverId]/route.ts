import { editServer, deleteServer } from "@/lib/db/server-queries";
import { getUserServerSide } from "@/lib/server-side-utils"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {
    try {
        const user = await getUserServerSide();
        const {name, imageUrl} = await req.json();

        if(!user){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const server = await editServer(params.serverId, user.id, {name, imageUrl})

        return NextResponse.json(server);
    } catch (err) {
        console.log("[SERVER_ID_PATCH]", err)
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function DELETE(req: Request, { params }: { params: {serverId: string} }) {
    try {
        const user = await getUserServerSide();

        if(!user){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const server = await deleteServer(params.serverId, user.id)

        return NextResponse.json(server);
    } catch (err) {
        console.log("[SERVER_ID_DELETE]", err)
        return new NextResponse("Internal Error", {status: 500})
    }
}