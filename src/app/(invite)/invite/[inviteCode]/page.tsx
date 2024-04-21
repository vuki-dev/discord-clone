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

    return <div>Invite Code page!</div>
}

export default InviteCodePage;