import { AppMessage } from "./appMessage";
import { Post } from "./post";
import { User } from "./user";

export interface Conversation{
    id: number,
    sender: User;
    senderId: number;
    post: Post;
    postId: number;
    messages: AppMessage[];
    deletedAt: string;
}