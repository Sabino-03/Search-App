import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, switchMap, toArray, take } from "rxjs/operators";
import { Post } from "../models/post";
import { PostMod } from "../models/postMod";

@Injectable({providedIn: 'root'})
export class SearchPosts {

  numOfPosts : number = 1;
  postList : PostMod[] = [];

  constructor(
    private http : HttpClient,
  ) {}

  posts() : PostMod[] | void {

    this.http
    .get<Post[]>(`https://jsonplaceholder.typicode.com/posts/`)
    .pipe(
      switchMap((post : Post[]) => post),
      take(this.numOfPosts),
      map((posts : Post) => {
        return {
          Titolo : posts.title,
          Testo : posts.body,
        };
      }),
      toArray()
    )
    .subscribe(
      (value : PostMod[]) => {
        this.postList = [...value];
        console.log('Post List: inPostService ' + this.postList);
      },
      (err) => console.log('error' + err),
      () => console.log('completed')
    )
    
  }
  
}
