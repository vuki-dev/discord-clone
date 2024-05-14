import { deleteChannel } from "@/lib/db/channel-queries";
import { getServer } from "@/lib/db/server-queries";
import { getUserServerSide } from "@/lib/server-side-utils";
import { NextResponse } from "next/server"

export async function DELETE(
    req: Request,
    { params }: { params: { channelId: string}}
) {
    try {
        const user = await getUserServerSide();
        const {searchParams} = new URL(req.url);
        console.log(req.url)

        const serverId = searchParams.get("serverId");

        console.log(serverId)

        if(!user){
            return new NextResponse("Unauthorized", {status: 401});
        }

        if(!serverId) {
            return new NextResponse("Server ID missing", {status: 400});
        }

        if(!params.channelId) {
            return new NextResponse("Channel ID missing", {status: 400});
        }

        const dbQuery = await deleteChannel(params.channelId, serverId, user.id)
        const server = await getServer(serverId, user.id);

        return NextResponse.json(server);
    } catch (err) {
        console.log("[CHANNEL_ID_DELETE]", err)
        return new NextResponse("Internl Error", {status: 500});
    }
}