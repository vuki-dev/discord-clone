import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import { getOrCreateConversation } from "@/lib/conversations";
import { getMember } from "@/lib/db/member-queries";
import { getUserServerSide } from "@/lib/server-side-utils";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
    params: {
        memberId: string;
        serverId: string;
    }
}

const MemberIdPage = async ({params}: MemberIdPageProps) => {
    const user = await getUserServerSide();

    if(!user){
        return redirect('/login');
    }

    const currentMember = await getMember(params.serverId, user.id);

    if(!currentMember){
        return redirect('/');
    }

    const conversation = await getOrCreateConversation(currentMember.id, params.memberId);

    if(!conversation) {
        return redirect(`/servers/${params.serverId}`);
    }

    const {memberOne, memberTwo} = conversation;

    const otherMember = memberOne.id === user.id ? memberTwo : memberOne;

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader name={otherMember.name} serverId={params.serverId} type="conversation" />
            <ChatMessages 
              member={currentMember}
              name={otherMember.name}
              chatId={conversation.id}
              type="conversation"
              apiUrl={`${process.env.API_URL}/api/messages`}
              socketUrl={`${process.env.API_URL}/api/messages`}
              socketQuery={{
                conversationId: conversation.id
              }}
              paramKey="conversationId"
              paramValue={conversation.id}
            />
            <ChatInput
              name={otherMember.name}
              type="conversation"
              apiUrl={`${process.env.API_URL}/api/messsages/send-message`}
              query={{
                conversationId: conversation.id
              }}
            />
        </div>
    )
}

export default MemberIdPage;