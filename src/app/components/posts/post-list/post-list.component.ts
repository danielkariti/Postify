import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Post } from "src/app/models/post.model";
import { PostsService } from "src/app/services/posts.service";
import { Subscription } from "rxjs";
import { UserService } from "src/app/services/user.service";


@Component({
  selector: 'app-post-list',
  templateUrl:'./post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy{
 posts: Post[] = [];
 isLoading = false;
 totalPosts = 0;
 postsPerPage = 2;
 pageSizeOptions = [2,3,4,5];
 currentPage = 1;
 isUserAuthenticated = false;
 userId: string;
 private postsSub: Subscription;
 private authStatusSub: Subscription;


  constructor(public postsService: PostsService,private userService : UserService){}

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.userService.getUserId();
    this.postsSub= this.postsService.getPostUpdateListener()
    .subscribe((postData : {posts: Post[], postCount: number})=> {
        this.isLoading = false;
        this.posts = postData.posts;
        this.totalPosts = postData.postCount;
    });
    this.isUserAuthenticated = this.userService.getIsAuth();
    this.authStatusSub = this.userService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
      this.userId = this.userService.getUserId();
    });
  }

  onChangePage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex+1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
  }

  onDelete(postId:string){
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage,this.currentPage);
    },() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
