import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Outfit } from '../interfaces/outfit';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OutfitsService {

  baseUrl: string = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  getAllOutfits() : Observable<Outfit[]> {
    return this.http.get<Outfit[]>(this.baseUrl + '/outfits');
  }

  getOutfitById(id : number) : Observable<Outfit>{
    return this.http.get<Outfit>(this.baseUrl + '/outfits/' + id);
  }

  createNewOutfit(outfit : Outfit) : Observable<Outfit>{
    return this.http.post<Outfit>(this.baseUrl + '/outfits', outfit);
  }

  deleteOutfit(id : number) {
    return this.http.delete(this.baseUrl + '/outfits' + id);
  }

  updateOutfit(id : number, outfit : Outfit) : Observable<Outfit> {
    return this.http.put<Outfit>(this.baseUrl + '/outfits' + id, outfit);
  }
}
