import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOutfit } from '../interfaces/outfit';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OutfitsService {

  baseUrl: string = environment.apiBaseUrl;

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
