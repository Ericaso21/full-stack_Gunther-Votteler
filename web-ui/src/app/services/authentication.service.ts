import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_URI } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { UserAuth } from '../interfaces/user-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private API_URI = API_URI.url;
  private role: any;
  constructor(private http: HttpClient, private router: Router) { }

  createUser(user: User) {
    return this.http.post(`${this.API_URI}/authentication/create`, user);
  }

  authentication(user_auth: UserAuth) {
    return this.http.post(`${this.API_URI}/authentication/authentication_user`, user_auth);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }

  public get roleLogIn(): boolean {
    this.role = localStorage.getItem('role');
    let role = JSON.parse(this.role);
    if (atob(role.role) !== '1') {
      return false
    } else {
      return true
    }
  }
}
