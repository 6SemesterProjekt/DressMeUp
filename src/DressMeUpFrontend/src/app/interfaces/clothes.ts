export interface IClothes {
  ClothesType: ClothesType;
  Color: number[];
  Fabric: number[];
  Seasons: number[];
  FilterTags: number[];
  Brand: string;
  Image: string;
  Name: string;
}

export enum ClothesType {
  Accessoires = 1, Overtøj, Overdele, Underdele, Sko
}
