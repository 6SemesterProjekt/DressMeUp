import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IClothes } from "../interfaces/clothes";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OutfitClothesService {
  baseUrl: string = environment.apiBaseUrl + "/clothes";
  constructor(private http: HttpClient) {}

  // request all the clothes from api - Need to change this metode!
  getAllclothes(): Observable<IClothes[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map((response) => {
        return response.map(
          (i) =>
            ({
              ClothesType: i.clothesType,
              Color: i.color,
              Fabric: i.fabric,
              Seasons: i.seasons,
              FilterTags: i.filterTags,
              Brand: i.brand,
              Image: i.image,
              Name: i.name,
            } as IClothes)
        );
      })
    );
  }
}
