import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { PostCreateComponent }  from '../components/posts/post-create/post-create.component';
import { PostListComponent}     from '../components/posts/post-list/post-list.component'
import { AngularMaterialModule } from "./angular-material.module";

@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class PostsModule {}
