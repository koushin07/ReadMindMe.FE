import { React } from "./react";
import { User } from "./user";

export interface Post  {
    id: number
    description: string;
    user: User;
    reacts: React[];
    createdAt: Date;
    heartCount: number;
    likeCount: number;
    careCount: number;
}