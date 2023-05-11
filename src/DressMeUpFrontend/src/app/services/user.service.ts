import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = environment.apiBaseUrl + "/users";

  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get<User[]>(this.baseUrl);
  }

  getUserById(id : number) {
    return this.http.get<User>(this.baseUrl + id);
  }

  createUser(user : User) {
    return this.http.post<User>(this.baseUrl, user);
  }

  deleteUser(id : number) {
    return this.http.delete(this.baseUrl + id);
  }

  updateUser(id : number, user : User) {
    return this.http.put<User>(this.baseUrl + id, user);
  }
}
