import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  isLoading = false;

  constructor(public userService:UserService){}

  login(form:NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading = true;

    this.userService.login(
      form.value.email,
      form.value.password);
  }

}

