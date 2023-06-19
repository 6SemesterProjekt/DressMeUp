import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { map, Observable, catchError } from "rxjs";
import { IClothes } from "../interfaces/clothes";
import { PhotoService } from "../services/photo.service";

@Injectable({
  providedIn: "root",
})
export class ClothesService {
  baseUrl: string = environment.apiBaseUrl + "/clothes";
  constructor(private http: HttpClient) { }
  allClothes: Observable<IClothes[]>;

  // request all the clothes from api

  getAllclothes(): Observable<IClothes[]> {
    return this.allClothes = this.http.get<any[]>(this.baseUrl).pipe(

      map((response) => {
        return response.map(
          (i) => ({
            Id: i.id,
            ClothesType: i.clothesType,
            Color: i.color,
            Fabric: i.fabric,
            Seasons: i.seasons,
            FilterTags: i.filterTags,
            Brand: i.brand,
            Image: i.image,
            Name: i.name,
            CreatedAt: i.createdAt,
            UpdatedAt: i.updatedAt
          } as IClothes)
        );
      })
    );

  }
  // New method to get clothes by ClothesType
  getClothesByType(clothesType: string): Observable<IClothes[]> {
    console.log("Gettting the getClothesByType() function.");
    return this.getAllclothes().pipe(
      map((clothes) =>
        clothes.filter((item) => item.ClothesType.toString() == clothesType) as IClothes[]
      )
    );
  }

  // request cloth by the id from api
  getClothesById(clothesId: number): Observable<IClothes> {
    return this.http.get<IClothes>(this.baseUrl + "/clothes/" + clothesId);
  }

  // create new cloth object from api
  createNewItem(newCloth: IClothes) {
    const cloth = {
      clothesType: newCloth.ClothesType,
      colors: newCloth.Color,
      fabrics: newCloth.Fabric,
      seasons: newCloth.Seasons,
      filterTags: newCloth.FilterTags,
      brand: newCloth.Brand,
      image: newCloth.Image,
      name: newCloth.Name,
    };

    return this.http.post<IClothes>(this.baseUrl, cloth);
  }

  // Delete cloth object from api
  deleteCloth(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }

  /* deleteCloth(cloth: IClothes) {
    return this.http.delete(this.baseUrl + cloth);
  } */

  // Delete cloth object from api
  /* deleteCloth(cloth: IClothes): Observable<any> {
    // Implement your logic here to delete the cloth using other identifying properties
    // For example, you might use cloth.name or cloth.type to identify and delete the cloth
    // Make sure to adjust this logic based on your actual data structure and requirements
    return this.http.delete(this.baseUrl + "?name=" + cloth.Name);
  } */
  // Update cloth object from api
  updateCloth(id: number, cloth: IClothes) {
    return this.http.put<IClothes>(this.baseUrl + id, cloth);
  }
}
