import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";

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

    console.log(`${process.env.API_URL}/api/messages/`)

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader type="channel" name={channel.name} serverId={channel.server_id} />
            <div className="flex-1">future messages</div>
            <ChatInput 
              name={channel.name}
              type="channel"
              apiUrl={`${process.env.API_URL}/api/messages/`}
              query={{
                channelId: channel.id,
                serverId: channel.server_id
              }}
            />
        </div>
    )
}

export default ChannelIdPage;