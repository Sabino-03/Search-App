import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';
import { User } from '../models/user';
import { Post } from '../models/post';
import { UserMod } from '../models/userMod';
import { PostMod } from '../models/postMod';

@Injectable({ providedIn: 'root' })
export class SearchService {

  private http = inject(HttpClient);

  userList$ : BehaviorSubject<UserMod[]> = new BehaviorSubject<UserMod[]>([]);
  postList$ : BehaviorSubject<PostMod[]> = new BehaviorSubject<PostMod[]>([]);

  onClickSearch( inputTerm : string ) : void {
    switch (inputTerm) {
      case 'users' : { this.onClickSearchUser(inputTerm); }
        break;

      case 'posts' : { this.onClickSearchPost(inputTerm); }
        break;

      default :
        throw new Error('Input NOT Valid');
    }
  }

  onClickSearchUser( inputTerm : string ) : BehaviorSubject<UserMod[]> {
    of(inputTerm)
    .pipe(
      switchMap((inputTerm : string) => {
        return this.http.get<User[]>(`https://jsonplaceholder.typicode.com/${inputTerm}/`)
        .pipe(
          //catchError((err : Error) => { throw new Error('Input NOT Valid : ' + err) }),
          switchMap((users : User[]) => users),
          map((user : User) => {
            return {
              Nome : user.name,
              UserName : user.username,
              Email : user.email
            }
          }),
          toArray()
        )
      })
    )
    .subscribe(
      (list : UserMod[]) => { this.userList$.next(list); },
      (err) => console.log('error' + err),
      () => console.log('completed')
    )
    return this.userList$;
  }

  onClickSearchPost( inputTerm : string ) : BehaviorSubject<PostMod[]> {
    of(inputTerm)
    .pipe(
      switchMap((inputTerm : string) => {
        return this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/${inputTerm}/`)
        .pipe(
          //catchError((err : Error) => { throw new Error('Input NOT Valid : ' + err) }),
          switchMap((posts : Post[]) => posts),
          map((post : Post) => {
            return {
              Titolo : post.title,
              Testo : post.body,
            }
          }),
          toArray()
        )
      })
    )
    .subscribe(
      (list : PostMod[]) => { this.postList$.next(list); },
      (err) => console.log('error' + err),
      () => console.log('completed')
    )
    return this.postList$;
  }

}
