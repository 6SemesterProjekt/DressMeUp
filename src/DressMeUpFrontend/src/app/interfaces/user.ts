import { IClothes } from "./clothes";
import { IOutfit } from "./outfit";

export interface IUser {
    id: number,
    email: string,
    phoneNumber: string,
    password: string,
    fullName: string,
    username: string,
    createdAt: Date,
    updatedAt: Date,
    clothes: IClothes[],
    outfits: IOutfit[],
    followers: IUser[],
    following: IUser[],
    admin: boolean,
    likedOutfits: IOutfit[],
    dislikedOutfits: IOutfit[],
    savedOutfits: IOutfit[],
}