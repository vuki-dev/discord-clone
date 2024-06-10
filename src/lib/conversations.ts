import { createConversation, findConversation, getConversationMember } from "./db/conversation-queries"
import { ConversationType } from "./types";

export const getOrCreateConversation = async (memberOneId: string, memberTwoId: string) => {
    let conversation = await findConversation(memberOneId, memberTwoId) || await findConversation(memberTwoId, memberOneId);

    if(!conversation) {
        conversation = await createConversation(memberOneId, memberTwoId);
    }

    conversation.memberOne = await getConversationMember(memberOneId);
    conversation.memberTwo = await getConversationMember(memberTwoId);

    return conversation;
}