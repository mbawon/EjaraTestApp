import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  LogOut(): void {
    window.sessionStorage.clear();
  }

  public saveLoginToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getLoginToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveLoginInfo(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getLoginInfo(): any {
    const userInfo = window.sessionStorage.getItem(USER_KEY);
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    return {};
  }

}
