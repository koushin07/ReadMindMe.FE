import { Conversation } from "./Conversation";
import { User } from "./user";

export interface AppMessage {
    content: string;
    readAt: string;
    isRead: boolean;
    conversation: Conversation;
    conversationId: number;
    sender: User
}