import { Component, OnDestroy, OnInit } from "@angular/core";
import { Post } from "src/app/models/post.model";
import { PostsService } from "src/app/services/posts.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl:'./post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy{
 posts: Post[] = [];
 isLoading = false;
 private postsSub: Subscription;

  constructor(public postsService: PostsService){}

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub= this.postsService.getPostUpdateListener()
    .subscribe((posts : Post[])=> {
        this.isLoading = false;
        this.posts = posts;
    });
  }

  onDelete(postId:string){
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
