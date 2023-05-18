import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = environment.apiBaseUrl + "/users/";

  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get<IUser[]>(this.baseUrl);
  }

  getUserById(id : number) {
    return this.http.get<IUser>(this.baseUrl + id);
  }

  createUser(user : IUser) {
    return this.http.post<IUser>(this.baseUrl, user);
  }

  deleteUser(id : number) {
    return this.http.delete(this.baseUrl + id);
  }

  updateUser(id : number, user : IUser) {
    return this.http.put<IUser>(this.baseUrl + id, user);
  }

  /**
   * Method to add a follower to a user's follower list.
   * @example: POST localhost:8080/api/users/{userIdToBeFollowed}/followers/followerIdToBeAdded
   * @param userId The user who is supposed to be followed
   * @param followerId The user who wants to follow another user
   * @returns 
   */
  followUser(userId : number, followerId : number) {
    return this.http.post(this.baseUrl + userId + '/followers/' + followerId, null);
  }

  /**
   * Method to remove a follower from a user's follower list.
   * @example: DELETE localhost:8080/api/users/{userIdFollowed}/followers/{followerIdToBeRemoved}
   * @param userId The currently followed user
   * @param followerId The user who should be removed from followers
   * @returns 
   */
  unfollowUser(userId : number, followerId : number) {
    return this.http.delete(this.baseUrl + userId + '/followers/' + followerId, null);
  }
}
