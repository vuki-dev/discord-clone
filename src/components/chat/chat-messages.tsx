"use client"

import { MemberType, MessageType } from "@/lib/types";
import ChatWelcome from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment, useRef, ElementRef } from "react";
import ChatItem from "./chat-item";
import { format } from "date-fns";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useChatScroll } from "@/hooks/use-chat-scroll";

const DATE_FORMAT = "d MMM yyyy, HH:mm"

interface ChatMessagesProps {
    name: string;
    member: MemberType;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
    type: "channel" | "conversation";
}

const ChatMessages = ({
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type
}: ChatMessagesProps) => {
    const queryKey = `chat:${chatId}`
    const addKey = `chat:${chatId}:messages`;
    const updateKey = `chat:${chatId}:messages:update`
 
    const chatRef = useRef<any>(null);
    const bottomRef = useRef<any>(null);

    const {data, fetchNextPage, hasNextPage, isFetchingNextPage, status} = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue
    })

    useChatSocket({queryKey, addKey, updateKey});
    useChatScroll({
        chatRef,
        bottomRef,
        loadMore: fetchNextPage,
        shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
        count: data?.pages?.[0]?.items?.length ?? 0
    })

    if(status === "pending") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin
                my-4" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Loading messages..
                </p>
            </div>
        )
    }

    if(status === "error") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Something went wrong..
                </p>
            </div>
        )
    }

    return (
        <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
            {!hasNextPage && <div className="flex-1" />}
            {!hasNextPage && (<ChatWelcome
              type={type}
              name={name}
            />)}
            {hasNextPage && (
                <div className="flex justify-center">
                    {isFetchingNextPage ? (
                        <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4"/>
                    ): (
                        <button
                          onClick={() => fetchNextPage()}
                          className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs
                          my-4 dark:hover:text-zinc-300 transition"
                        >
                            Load previous messages
                        </button>
                    )}
                </div>
            )}
            <div className="flex flex-col-reverse mt-auto">
                {
                    data?.pages?.map((group, i) => (
                        <Fragment key={i}>
                            {group.items?.map((message: MessageType) => {
                               return <ChatItem key={message.id}
                                member={message.member}
                                currentMember={member}
                                id={message.id}
                                content={message.content}
                                fileUrl={message.file_url}
                                deleted={message.deleted}
                                timestamp={format(new Date(message.created_at), DATE_FORMAT)}
                                isUpdated={message.updated_at !== message.created_at}
                                socketUrl={socketUrl}
                                socketQuery={socketQuery}
                                />
                            })}
                        </Fragment>
                    ))
                }
            </div>
            <div ref={bottomRef} />
        </div>
    )
}

export default ChatMessages;