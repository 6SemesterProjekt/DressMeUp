import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { map, Observable, catchError } from "rxjs";
import { Clothes } from "../interfaces/clothes";
import { PhotoService } from "../services/photo.service";


@Injectable({
  providedIn: "root",
})
export class ClothesService {
  baseUrl: string = environment.apiBaseUrl + "/clothes";
  constructor(private http: HttpClient, private photoService: PhotoService) { }

  // request all the clothes from api
  getAllclothes(): Observable<Clothes[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map((response) => {
        return response.map(
          (i) =>
          ({
            ClothesType: i.ClothesType,
            Color: i.Color,
            Fabric: i.Fabric,
            Seasons: i.Seasons,
            FilterTags: i.filterTags,
            Brand: i.brand,
            Image: i.image,
            Name: i.name,
          } as Clothes)
        );
      })
    );
  }

  // request cloth by the id from api
  getClothesById(clothesId: number): Observable<Clothes[]> {
    return this.http.get<any[]>(this.baseUrl + "/clothes/" + clothesId).pipe(
      map((response) => {
        return response.map(
          (i) =>
          ({
            ClothesType: i.ClothesType,
            Color: i.Color,
            Fabric: i.Fabric,
            Seasons: i.Seasons,
            FilterTags: i.filterTags,
            Brand: i.brand,
            Image: i.image,
            Name: i.name,
          } as Clothes)
        );
      })
    );
  }

  // create new cloth object from api
  createNewItem(newCloth: Clothes) {
    const cloth = {
      ClothesType: newCloth.ClothesType,
      Color: newCloth.Color,
      Fabric: newCloth.Fabric,
      Seasons: newCloth.Seasons,
      FilterTags: newCloth.FilterTags,
      Brand: newCloth.Brand,
      Image: newCloth.Image,
      Name: newCloth.Name,
    };

    return this.http.post<Clothes>(this.baseUrl, cloth);
  }
}
