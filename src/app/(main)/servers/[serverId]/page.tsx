import { getServerFull, getUserServerSide } from "@/lib/server-side-utils";
import { redirect } from "next/navigation";

interface ServerIdPageProps {
    params: {
        serverId:string;
    }
}

const ServerIdPage = async ({params}: ServerIdPageProps) => {
    const user = await getUserServerSide();

    if(!user){
        return redirect('/login');
    }
    
    const server = await getServerFull(params.serverId, user.id);

    const initialChannel = server?.channels?.[0];

    if(initialChannel?.name !== "general"){
        return null
    }

    return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`);
}

export default ServerIdPage;