import { getUserServerSide } from "@/lib/server-side-utils";
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

        //const server = await updateMemberRole();

        // dont forget to return json response with data
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

        // const server = await kickMember();

        // dont forget to return json response with data

    } catch (err) {
        console.log("MEMBER_ID_DELETE", err);
        return new NextResponse("Internal Error", {status: 500})
    }
}