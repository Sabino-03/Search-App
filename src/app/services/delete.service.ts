import { Injectable } from "@angular/core";
import { NumberOfService } from "./numberOf.service";

@Injectable({ providedIn: 'root' })
export class DeleteService {

  constructor( private numberOfService : NumberOfService ) {}

  resetCounters() {
    this.numberOfService.numOfUsers = 0 ;
    this.numberOfService.numOfPosts = 0 ;
  }

}
