import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoginComponent }       from '../components/auth/login/login.component';
import { RegisterComponent }    from '../components/auth/register/register.component';
import { AngularMaterialModule } from "./angular-material.module";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}
