import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { UserService } from "src/app/services/user.service";

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy{
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(public userService: UserService){}


  ngOnInit(): void {
    this.authStatusSub = this.userService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  register(form: NgForm){
    if (form.invalid){
      return;
    }
    this.isLoading = true;
    this.userService
    .createUser(
      form.value.email,
      form.value.password,
      form.value.fullName,
      form.value.birthDate,
      form.value.address
      )
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
