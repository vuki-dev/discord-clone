import ChatHeader from "@/components/chat/chat-header";

import { getChannel } from "@/lib/db/channel-queries";
import { getMember } from "@/lib/db/member-queries";
import { getUserServerSide } from "@/lib/server-side-utils"

import { redirect } from "next/navigation";


interface ChannelIdPageProps {
    params: {
        serverId: string,
        channelId: string
    }
};

const ChannelIdPage = async ({params}: ChannelIdPageProps) =>{

    const user = await getUserServerSide();

    const channel = await getChannel(params?.channelId)

    const member = await getMember(params?.serverId, user.id);

    if(!channel || !member){
        redirect('/');
    }

    return (
        <div className="bg-white dark:bg-[#313338]">
            <ChatHeader type="channel" name={channel.name} serverId={channel.server_id} />
        </div>
    )
}

export default ChannelIdPage;