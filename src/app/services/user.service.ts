import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, ResponseModel, User } from '../models/responseModel';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiKey = import.meta.env.NG_APP_USER_API_URL;
  private user: User | null = null;
  private userSubject = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient) {
    this.loadUser();
  }

  private loadUser() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const userData = sessionStorage.getItem('LoggedUser');
      if (userData) {
        this.userSubject.next(JSON.parse(userData));
      }
    }
  }

  googleLogin(userData: object): Observable<ResponseModel<LoginResponse>> {
    return this.http.post<ResponseModel<LoginResponse>>(`${this.apiKey}/login`, userData)
  }

  setUser(user: User) {
    this.user = user;
    this.userSubject.next(user);
  }

  getUser(): User | null {
    if (!this.user) {
      const userData = sessionStorage.getItem('LoggedUser');
      if (userData) {
        this.user = JSON.parse(userData);
        this.userSubject.next(this.user);
      }
    }
    return this.user;
  }

  searchUsers(email: string, query: string): Observable<ResponseModel<User[]>> {
    return this.http.get<ResponseModel<User[]>>(`${this.apiKey}/searchUser?q=${query}`);
  }

  logout() {
    sessionStorage.removeItem('LoggedUser');
    this.userSubject.next(null);
  }
}
