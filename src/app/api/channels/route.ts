import { createChannel } from "@/lib/db/channel-queries";
import { getServerFull, getUserServerSide } from "@/lib/server-side-utils";
import { NextResponse } from "next/server";

export async function POST(req: Request, {params}: {params: {serverId: string}}) {
    try {
        const user = await getUserServerSide();
    const {name, type} = await req.json();
    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get("serverId");

    if(!user) {
        return new NextResponse("Unauthorized", {status:401});
    }

    if(!serverId) {
        return new NextResponse("Server id missing",{status: 400})
    }

    if(name === "general"){
        return new NextResponse("Name cannot be general", {status: 400})
    }

    await createChannel({name, type},serverId, user.id);

    const server = getServerFull(serverId,user.id)
    return NextResponse.json(server)
    } catch (err) {
        console.log("[CHANNELS]", err)
        return new NextResponse("Internal Error",{status: 500})
    }

}