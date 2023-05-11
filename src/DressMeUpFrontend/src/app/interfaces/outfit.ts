import { IClothes } from "./clothes";

export interface IOutfit {
  id: number,
  likes: number,
  dislikes: number,
  clothes: IClothes[],
  createdAt: Date,
  updatedAt: Date
}