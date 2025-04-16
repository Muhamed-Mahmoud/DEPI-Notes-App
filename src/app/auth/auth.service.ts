// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { User } from '../model/user';


// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private baseUrl = 'http://localhost:8000';
//   private tokenKey = 'auth_token';

//   constructor(private http: HttpClient, private router: Router) {}
//   login(email: string, password: string) {
//     return this.http.post<{ token: string, user: any }>(`${this.baseUrl}/login`, { email, password });
//   }

//   setToken(token: string) {
//     localStorage.setItem(this.tokenKey, token);
//   }

//   getToken(): string | null {
//     return localStorage.getItem(this.tokenKey);
//   }

//   isLoggedIn(): boolean {
//     return !!this.getToken();
//   }

//   logout() {
//     localStorage.removeItem(this.tokenKey);
//     this.router.navigate(['/login']);
//   }

//   registerApi(data:User){
//     const url = "http://localhost:8000/register";
//    return this.http.post(url,data)
//    }
// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8000';
  //private tokenKey = 'auth_token';

  constructor(private http: HttpClient, private router: Router) {}
  /* login(email: string, password: string) {
    return this.http.post<{ token: string, user: any }>(${this.baseUrl}/login, { email, password });
  } */
  login(email: string, password: string) {
 
    return this.http.post<any>('http://localhost:8000/login', { email, password });
  }

  /* setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  } */
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  /* getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  } */
    getToken() {
      return localStorage.getItem('token');
    }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    //localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  isAuthenticated(): boolean {
    return !!this.getToken(); // إذا كان هناك توكن يعني أن المستخدم مسجل دخول
  }
registerApi(data:User){
  const url = "http://localhost:8000/register";
 return this.http.post(url,data)
 }
}