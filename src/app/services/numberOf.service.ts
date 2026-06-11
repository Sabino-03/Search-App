import { Injectable } from "@angular/core";
import { SearchService } from "./search.service";

@Injectable({ providedIn: 'root' })
export class NumberOf {

  constructor( private searchService : SearchService ) {}

  addNumberOfUsers() { this.searchService.numOfUsers ++ }

  subNumberOfUsers() {
    if(this.searchService.numOfUsers > 0)
      this.searchService.numOfUsers --
    else
      throw new Error('Operazione NON Eseguibile');
  }

  addNumberOfPosts() { this.searchService.numOfPosts ++ }

  subNumberOfPosts() {
    if(this.searchService.numOfPosts > 0)
      this.searchService.numOfPosts --
    else
      throw new Error('Operazione NON Eseguibile');
  }

}
