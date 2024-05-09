import { redirect } from "next/navigation";

import { getUserServerSide } from "@/lib/server-side-utils";
import {
  getServer,
  getServerChannels,
  getServerMembers,
} from "@/lib/db/server-queries";

import { MemberRole, ServerType, ChannelInteractionType } from "@/lib/types";
import ServerHeader from "./server-header";
import ServerSearch from "./server-search";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const iconMap = {
  [ChannelInteractionType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelInteractionType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
  [ChannelInteractionType.AUDIO]: <Mic className="mr-2 h-4 w-4" />
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck  className="mr-2 h-4 w-4 text-indigo-500"/>,
  [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />
}


const ServerSidebar = async ({ serverId }: { serverId: string }) => {
  const user = await getUserServerSide();

  if (!user) {
    return redirect("/login");
  }

  const server: ServerType = await getServer(serverId, user.id);

  if (!server) {
    return redirect("/");
  }

  server.channels = await getServerChannels(serverId);
  server.members = await getServerMembers(serverId);

  const textChannels = server?.channels.filter(
    (channel) =>
      channel.channel_type !== null && channel.channel_type === "TEXT"
  );
  const videoChannels = server?.channels.filter(
    (channel) =>
      channel.channel_type !== null && channel.channel_type === "VIDEO"
  );
  const audioChannels = server?.channels.filter(
    (channel) =>
      channel.channel_type !== null && channel.channel_type === "AUDIO"
  );
  const members = server?.members.filter(
    (member) => member.user_id !== user.id
  );

  const role = server.members.find(
    (member) => member.user_id === user.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
      <ServerHeader server={server} role={role} />
        <ScrollArea className="flex-1 px-3">
          <div className="mt-2">
            <ServerSearch data={[
                {
                  label: "Text Channels",
                  type: "channel",
                  data: textChannels.map((channel) => ({
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.channel_type]
                  }))
                },
                {
                  label: "Voice Channels",
                  type: "channel",
                  data: audioChannels.map((channel) => ({
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.channel_type]
                  }))
                },
                {
                  label: "Video Channels",
                  type: "channel",
                  data: videoChannels.map((channel) => ({
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.channel_type]
                  }))
                },
                {
                  label: "Members",
                  type: "member",
                  data: members?.map((member) => ({
                    id: member.id,
                    name: member.name,
                    icon: roleIconMap[member.role]
                  }))
                }
              ]} />

          </div>
          <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"/>

        </ScrollArea>
    </div> 
  );
};

export default ServerSidebar;
