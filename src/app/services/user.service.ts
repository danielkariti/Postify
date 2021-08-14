import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "../models/auth-data.model";
import { UserData } from "../models/user.model";

@Injectable({ providedIn: "root" })
export class UserService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;
  private userId: string;

  constructor(private http:HttpClient,  private router: Router){}

  createUser(email : string, password: string, fullName: string, birthDate: Date, address: string){
    const userData: UserData = {
      email: email,
      password: password,
      fullName: fullName,
      birthDate: birthDate,
      address: address
    }
    this.http.post("http://localhost:3000/user/register", userData)
    .subscribe(() => {
      this.router.navigate(["/"]);
    }, error => {
      this.authStatusListener.next(false);
    })

  }

  login(email : string, password: string){
    const authData: AuthData = {
      email: email,
      password: password,
    }
    this.http.post<{token: string, expiresIn: number , userId: string }>("http://localhost:3000/user/login",authData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      if(token){
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.userId = response.userId
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration*1000);
        this.saveAuthData(token, expirationDate, this.userId)
        this.router.navigate(["/"]);
      }
    }, error => {
      this.authStatusListener.next(false);
    })

  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer)
    this.clearAuthData();
    this.router.navigate(["/"]);

  }

  autoAuthUser(){
    const authInfo = this.getAuthData();
    if (!authInfo){
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0){
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.userId = authInfo.userId;
      this.authStatusListener.next(true);
      this.setAuthTimer(expiresIn/1000);
    }
  }


  private saveAuthData(token: string, expirationDate: Date , userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if(!token || !expirationDate){
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private setAuthTimer(duration: number){
    this.tokenTimer =setTimeout(()=> {
      this.logout();
    }, duration*1000)
  }

  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getUserId(){
    return this.userId;
  }

}
