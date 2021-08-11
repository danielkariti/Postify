import { Component,Input } from "@angular/core";
import { Post } from "../post.model";

@Component({
  selector: 'app-post-list',
  templateUrl:'./post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent{
  // posts= [
  //   {title: 'First Post', content: 'I\'m actually the first post'},
  //   {title: 'Second Post', content: 'I\'m actually the second post'},
  //   {title: 'Third Post', content: 'I\'m actually the third post'}
  // ]
  @Input() posts: Post[] = [];
}
