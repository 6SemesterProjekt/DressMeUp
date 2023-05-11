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
    Followers: IUser[],
    Following: IUser[],
    Admin: boolean,
    LikedOutfits: IOutfit[],
    DislikedOutfits: IOutfit[],
    SavedOutfits: IOutfit[],
}