"use client";

import {
  ChannelInteractionType,
  ChannelType,
  MemberRole,
  ServerType,
} from "@/lib/types";
import { useParams, useRouter } from "next/navigation";

import { Edit, Hash, Mic, Trash, Video, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "../action-tooltip";

interface ServerChannelProps {
  channel: ChannelType;
  server: ServerType;
  role?: MemberRole;
}

const iconMap = {
  [ChannelInteractionType.TEXT]: Hash,
  [ChannelInteractionType.AUDIO]: Mic,
  [ChannelInteractionType.VIDEO]: Video
};

const ServerChannel = ({ channel, server, role }: ServerChannelProps) => {
  const params = useParams();
  const router = useRouter();

  const Icon = iconMap[channel.channel_type];

  return (
    <button
      onClick={() => {}}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
       <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
       <p className={cn(
        'line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition',
        params?.channelId === channel.id && 'text-primary dark:text-zinc-200 dark:group-hover:text-white'
       )}>
        {channel.name}
       </p>
       {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
            <ActionTooltip label="Edit">
                <Edit className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
            </ActionTooltip>
            <ActionTooltip label="Edit">
                <Trash className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
            </ActionTooltip>
        </div>
       )}
       {channel.name === "general" && (
        <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400" />
       )}
    </button>
  );
};

export default ServerChannel;