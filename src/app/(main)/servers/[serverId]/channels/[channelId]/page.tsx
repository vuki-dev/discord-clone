import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";

import { getChannel } from "@/lib/db/channel-queries";
import { getMember } from "@/lib/db/member-queries";
import { getUserServerSide } from "@/lib/server-side-utils";
import { ChannelInteractionType } from "@/lib/types";

import { redirect } from "next/navigation";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const user = await getUserServerSide();

  const channel = await getChannel(params?.channelId);

  const member = await getMember(params?.serverId, user.id);

  if (!channel || !member) {
    redirect("/");
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        type="channel"
        name={channel.name}
        serverId={channel.server_id}
      />
      {channel.channel_type === ChannelInteractionType.TEXT && (
        <>
          <ChatMessages
            member={member}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl={`${process.env.API_URL}/api/messages/`}
            socketUrl={`${process.env.API_URL}/api/messages/`}
            socketQuery={{
              channelId: channel.id,
              serverId: channel.server_id,
            }}
            paramKey="channelId"
            paramValue={channel.id}
          />
          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl={`${process.env.API_URL}/api/messages/send-message`}
            query={{
              channelId: channel.id,
              serverId: channel.server_id,
            }}
          />
        </>
      )}
      {channel.channel_type === ChannelInteractionType.AUDIO && (
        <MediaRoom chatId={channel.id} video={false} audio={true} />
      )}
      {channel.channel_type === ChannelInteractionType.VIDEO && (
        <MediaRoom chatId={channel.id} video={true} audio={false} />
      )}
    </div>
  );
};

export default ChannelIdPage;
