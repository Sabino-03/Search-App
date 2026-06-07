import { Injectable } from "@angular/core";
import { SearchUsers } from "./users.service";
import { SearchPosts } from "./posts.service";

@Injectable({providedIn: 'root'})
export class ClearNavBar {

  constructor(
    private usersService : SearchUsers,
    private postsService : SearchPosts,
  ) {}

  clear() {

    this.usersService.numOfUsers = 1;
    this.usersService.userList = [];

    this.postsService.numOfPosts = 1;
    this.postsService.postList = [];

  }
  
}
