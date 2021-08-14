import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "src/app/services/user.service";

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  isLoading = false;

  constructor(public userService: UserService){}

  register(form: NgForm){
    if (form.invalid){
      return;
    }
    this.userService
    .createUser(
      form.value.email,
      form.value.password,
      form.value.fullName,
      form.value.birthDate,
      form.value.address
      );
  }
}
