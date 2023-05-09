import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOutfit } from '../interfaces/outfit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutfitsService {

baseUrl : string = 'http://localhost:8080/api';

  constructor(private http:HttpClient) { }

  getAllOutfits() : Observable<IOutfit[]> {
    return this.http.get<IOutfit[]>(this.baseUrl + '/outfits');
  }

  getOutfitById(id : number) : Observable<IOutfit>{
    return this.http.get<IOutfit>(this.baseUrl + '/outfits/' + id);
  }

  createNewOutfit(outfit : IOutfit) : Observable<IOutfit>{
    return this.http.post<IOutfit>(this.baseUrl + '/outfits', outfit);
  }

  deleteOutfit(id : number) {
    return this.http.delete(this.baseUrl + '/outfits' + id);
  }

  updateOutfit(id : number, outfit : IOutfit) : Observable<IOutfit> {
    return this.http.put<IOutfit>(this.baseUrl + '/outfits' + id, outfit);
  }
}
