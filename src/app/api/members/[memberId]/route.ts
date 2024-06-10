import { kickMember, updateMemberRole } from "@/lib/db/member-queries";
import { getServer } from "@/lib/db/server-queries";
import { getServerFull, getUserServerSide } from "@/lib/server-side-utils";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}: { params: { memberId: string }}) {
    try {
        const user = await getUserServerSide();
        const { searchParams } = new URL(req.url);
        const { role } = await req.json();

        const serverId = searchParams.get("serverId");
        
        if(!user) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if(!serverId) {
            return new NextResponse("Server id missing", {status: 400});
        }

        if(!params.memberId){
            return new NextResponse("Member id missing", {status: 400});
        }

        await updateMemberRole(role, serverId, user.id, params.memberId);
        const server = await getServerFull(serverId, user.id);
        // dont forget to return json response with data
        return NextResponse.json(server);
    } catch (err) {
        console.log("MEMBERS_ID_PATCH", err);
        return new NextResponse("Internal Error", {status: 500});
    }
}

export async function DELETE (req: Request, {params}: {params: {memberId: string}}) {
    try{
        const user = await getUserServerSide();
        const { searchParams } = new URL(req.url);

        const serverId = searchParams.get("serverId");
        
        if(!user) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if(!serverId) {
            return new NextResponse("Server id missing", {status: 400});
        }

        if(!params.memberId){
            return new NextResponse("Member id missing", {status: 400});
        }

        await kickMember(params.memberId, serverId, user.id);
        const server = await getServerFull(serverId, user.id);

        return NextResponse.json(server);
    } catch (err) {
        console.log("MEMBER_ID_DELETE", err);
        return new NextResponse("Internal Error", {status: 500})
    }
}