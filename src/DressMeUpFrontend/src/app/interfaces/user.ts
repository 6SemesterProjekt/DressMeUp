import { Clothes } from "./clothes";
import { Outfit } from "./outfit";

export interface User {
  id: number;
  name: string;
  phoneNo: string;
  email: string;
  password: string;
  clothes: Clothes[];
  outfits: Outfit[];
  followers: User[]; 
  following: User[];
  admin: boolean;
  createdAt: Date;
  updatedAt: Date;
}