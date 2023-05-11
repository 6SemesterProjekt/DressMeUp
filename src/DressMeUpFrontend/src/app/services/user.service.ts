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

  /**
   * Method to add a follower to a user's follower list.
   * Example: localhost:8080/api/users/{userIdToBeFollowed}/removefollower
   * Payload: 
   * {
   *    "id": userIdToBeAdded
   * }
   * @param userIdToBeFollowed The user who is supposed to be followed
   * @param userIdToBeAdded The user who wants to follow another user
   * @returns 
   */
  followUser(userIdToBeFollowed : number, userIdToBeAdded : number) {
    return this.http.post(this.baseUrl + userIdToBeFollowed + '/addfollower/', { id: userIdToBeAdded });
  }

  /**
   * Method to remove a follower from a user's follower list.
   * Example: localhost:8080/api/users/{userIdFollowed}/removefollower
   * Payload: 
   * {
   *    "id": userIdToBeRemoved
   * }
   * @param userIdFollowed The currently followed user
   * @param userIdToBeRemoved The user who should be removed from followers
   * @returns 
   */
  unfollowUser(userIdFollowed : number, userIdToBeRemoved : number) {
    return this.http.post(this.baseUrl + userIdFollowed + '/removefollower/', { id: userIdToBeRemoved });
  }
}
