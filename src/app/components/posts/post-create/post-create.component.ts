import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Post } from "src/app/models/post.model";
import { PostsService } from "src/app/services/posts.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{
  enteredContent='';
  enteredTitle='';


  constructor(public postsService: PostsService){}

  ngOnInit(): void {

  }

  onAddPost(form: NgForm){
    if(form.invalid){
      return;
    }
    const post: Post = {
        id: null,
        title: form.value.title,
        content:form.value.content
      };

      this.postsService.addPost(post);

      form.resetForm();
  }
}
