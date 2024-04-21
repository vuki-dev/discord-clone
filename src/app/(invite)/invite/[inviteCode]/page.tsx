import { getExistingServer } from "@/lib/db/server-querys";
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

    if(!params){
        redirect('/')
    }

    const existingServer = await getExistingServer(params.inviteCode, user.id);

    if(existingServer) {
        return redirect(`/servers/${existingServer.id}`)
    }

    return null;
}

export default InviteCodePage;