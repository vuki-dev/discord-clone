import { getExistingServer, joinOnInvite } from "@/lib/db/server-querys";
import { getUserServerSide } from "@/lib/server-side-utils";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
    params: {
        inviteCode:string;
    };
}

const InviteCodePage = async ({params}: InviteCodePageProps) => {

    const user = await getUserServerSide();

    if(!user){
        redirect('/login');
    }

    if(!params.inviteCode){
        redirect('/')
    }

    const existingServer = await getExistingServer(params.inviteCode, user.id);

    if(existingServer) {
        return redirect(`/servers/${existingServer.id}`)
    }

    const server = await joinOnInvite(params.inviteCode, user.id);

    if(server) {
        return redirect(`/servers/${server.id}`)
    }

    return null;
}

export default InviteCodePage;