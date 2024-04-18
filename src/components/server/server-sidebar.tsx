import { redirect } from "next/navigation";

import { getUserServerSide } from "@/lib/server-side-utils";
import {
  getServer,
  getServerChannels,
  getServerMembers,
} from "@/lib/db/server-querys";

import { ServerType } from "@/lib/types";

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
  console.log(server);

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

  const role = server.members.find((member) => member.user_id === user.id)?.role

  return <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
    Server Sidebar Component
  </div>;
};

export default ServerSidebar;
