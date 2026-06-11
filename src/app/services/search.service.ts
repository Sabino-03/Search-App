import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, map, switchMap, take, toArray } from 'rxjs/operators';
import { User } from '../models/user';
import { Post } from '../models/post';
import { UserMod } from '../models/userMod';
import { PostMod } from '../models/postMod';

@Injectable({ providedIn: 'root' })
export class SearchService {

  numOfUsers : number = 1;
  userList$ : BehaviorSubject<UserMod[]> = new BehaviorSubject<UserMod[]>([]);

  numOfPosts : number = 1;
  postList$ : BehaviorSubject<PostMod[]> = new BehaviorSubject<PostMod[]>([]);

  constructor( private http : HttpClient ) {}

  onClickSearch( inputTerm : string ) : void {

    switch (inputTerm) {

      case "users" : { this.onClickSearchUser(inputTerm); }
        break;
      
      case "posts" : { this.onClickSearchPost(inputTerm); }
        break;

      default :
        throw new Error('Input NOT Valid : ');

    }

  }

  onClickSearchUser( inputTerm : string ) : void {

    this.http.get<User[]>(`https://jsonplaceholder.typicode.com/${inputTerm}/`)
    .pipe(
      //catchError((err : Error) => { throw new Error('Input NOT Valid : ' + err) }),
      switchMap((users : User[]) => users),
      take(this.numOfUsers),
      map((user : User) => {
        return {
          Nome : user.name,
          UserName : user.username,
          Email : user.email
        }
      }),
      toArray()
    )
    .subscribe(
      (list : UserMod[]) => { return this.userList$.next(list); },
      (err) => console.log('error' + err),
      () => console.log('completed')
    )

  }

  onClickSearchPost( inputTerm : string ) : void {

    this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/${inputTerm}/`)
    .pipe(
      //catchError((err : Error) => { throw new Error('Input NOT Valid : ' + err) }),
      switchMap((users : Post[]) => users),
      take(this.numOfPosts),
      map((user : Post) => {
        return {
          Titolo : user.title,
          Testo : user.body,
        }
      }),
      toArray()
    )
    .subscribe(
      (list : PostMod[]) => { return this.postList$.next(list); },
      (err) => console.log('error' + err),
      () => console.log('completed')
    )

  }

}
