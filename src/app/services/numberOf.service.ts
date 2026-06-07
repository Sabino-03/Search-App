import { Injectable } from "@angular/core";
import { SearchUsers } from "./users.service";
import { SearchPosts } from "./posts.service";

@Injectable({providedIn: 'root'})
export class NumberOf {

  constructor(
    private usersService : SearchUsers,
    private postsService : SearchPosts
  ) {}

  addUsers() {
    this.usersService.numOfUsers ++
  }

  subUsers() {
    if(this.usersService.numOfUsers > 0)
      this.usersService.numOfUsers --
    else
      throw new Error('Operazione NON Eseguibile');
  }

  addPosts() {
    this.postsService.numOfPosts ++
  }

  subPosts() {
    if(this.postsService.numOfPosts > 0)
      this.postsService.numOfPosts --
    else
      throw new Error('Operazione NON Eseguibile');
  }

}
