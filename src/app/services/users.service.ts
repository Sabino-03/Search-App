import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, switchMap, toArray, take } from "rxjs/operators";
import { User } from "../models/user";
import { UserMod } from "../models/userMod";

@Injectable({providedIn: 'root'})
export class SearchUsers {

  numOfUsers : number = 1;
  userList : UserMod[] = [];

  constructor(
    private http : HttpClient,
  ) {}

  users() : UserMod[] | void {

    this.http
    .get<User[]>(`https://jsonplaceholder.typicode.com/users/`)
    .pipe(
      switchMap((user : User[]) => user),
      take(this.numOfUsers),
      map((users : User) => {
        return {
          Nome : users.name,
          UserName : users.username,
          Email : users.email,
        };
      }),
      toArray()
    )
    .subscribe(
      (value : UserMod[]) => {
        this.userList = [...value];
        console.log('User List: inUserService ' + this.userList);
      },
      (err) => console.log('error' + err),
      () => console.log('completed')
    )
  }
  
}
