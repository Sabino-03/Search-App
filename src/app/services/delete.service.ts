import { Injectable } from "@angular/core";
import { SearchService } from "./search.service";

@Injectable({ providedIn: 'root' })
export class DeleteService {

  constructor( private searchService : SearchService ) {}

  resetLists() {
    this.searchService.userList$.next([]);
    this.searchService.postList$.next([]);
  }

  resetCounters() {
    this.searchService.numOfUsers = 1;
    this.searchService.numOfPosts = 1;
  }

  resetAllSystem() {
    this.resetLists();
    this.resetCounters();
  }

}
