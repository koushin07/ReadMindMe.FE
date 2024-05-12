import { Photo } from "./photo";

export interface User{
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    photoUrl: string,
    photos: Photo[]
}