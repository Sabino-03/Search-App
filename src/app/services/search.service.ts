import { Injectable } from '@angular/core';
import { SearchPosts } from './posts.service';
import { SearchUsers } from './users.service';

@Injectable({ providedIn: 'root' })
export class SearchService {

  searchTag : string = '';

  constructor(
    public postsService: SearchPosts,
    public usersService: SearchUsers,
  ) {}

  search(tag : string) {
    this.searchTag = tag;

    switch (this.searchTag) {
      case 'users' : {
        console.log(`Searching ${tag}...`);
        this.usersService.users();
      }
      break;

      case 'posts' : {
        console.log(`Searching ${tag}...`);
        this.postsService.posts();
      }
      break;

      default : {
        console.log(`Searching ${tag}...`);
        throw new Error('Search Error');
      }
    }

  }
}
