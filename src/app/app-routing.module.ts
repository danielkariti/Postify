import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/auth/login/login.component";
import { RegisterComponent } from "./components/auth/register/register.component";
import { PostCreateComponent } from "./components/posts/post-create/post-create.component";
import { PostListComponent } from "./components/posts/post-list/post-list.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {path: '', component: PostListComponent},
  {path: 'create-post', component: PostCreateComponent, canActivate: [AuthGuard]} ,
  {path: 'edit-post/:postId', component: PostCreateComponent , canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: '**',  redirectTo: ''}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule{}
