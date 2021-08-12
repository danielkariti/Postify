import { Injectable } from "@angular/core";
import { Post } from "../models/post.model";
import {Subject} from 'rxjs'
import { HttpClient } from "@angular/common/http";
import {map} from 'rxjs/operators'
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class PostsService{
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router){}

  // Get all posts
  getPosts(){
    this.http.get<{message: string, posts: any}>("http://localhost:3000/posts")
    // transform _id to id to match the client side model
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        }
      });
    }))
    .subscribe(transformedPosts => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  getPost(id: string){
    return this.http.get<{_id: string, title: string, content: string}>("http://localhost:3000/posts/"+id);
  }

  // Add post
  addPost(title:string, content: string){
    const post: Post = {
      id: null,
      title: title,
      content:content
    };
    this.http.post<{message:string, postId: string}>("http://localhost:3000/posts",post)
    .subscribe((responseData)=>{
      // Getting the id received from the database
      // Inserting the id to the new added post
      const id=responseData.postId;
      post.id = id;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });
  }

 // Update post by id
  updatePost(id:string,title:string, content: string){
    const post: Post = {
      id: id,
      title: title,
      content:content
    };
    this.http.put("http://localhost:3000/posts/"+id,post)
    .subscribe(response => {
      const updatePosts = [...this.posts];
      const oldPostIndex = updatePosts.findIndex(p => p.id === post.id);
      updatePosts[oldPostIndex] = post;
      this.posts = updatePosts;
      this.postsUpdated.next();
      this.router.navigate(["/"]);
    })
  }

  // Delete post by id
  deletePost(postId:string){
    this.http.delete("http://localhost:3000/posts/"+postId)
    .subscribe(() => {
      // filter out of the posts array the id that matches the requested one
      // so that the UI updates the deletion.
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    })
  }

}
