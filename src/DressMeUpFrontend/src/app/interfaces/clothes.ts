import { IonDatetime } from "@ionic/angular";

export interface IClothes {
  Id: number,
  ClothesType: ClothesType;
  Color: number[];
  Fabric: number[];
  Seasons: number[];
  FilterTags: number[];
  Brand: string;
  Image: string;
  Name: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export enum ClothesType {
  Accessoires = 1, Overtøj, Overdele, Underdele, Sko
}
