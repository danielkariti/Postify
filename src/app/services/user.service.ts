import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from "../models/auth-data.model";

@Injectable({ providedIn: "root" })
export class UserService {

  constructor(private http:HttpClient){}

  createUser(email : string, password: string, fullName: string, birthDate: Date, address: string){
    const authData: AuthData = {
      email: email,
      password: password,
      fullName: fullName,
      birthDate: birthDate,
      address: address
    }
    this.http.post("http://localhost:3000/user/register", authData)
    .subscribe(response => {
      console.log(response);
    })
  }

}
