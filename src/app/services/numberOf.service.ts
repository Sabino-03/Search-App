import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class NumberOfService {

  numOfUsers : number = 0 ;
  numOfPosts : number = 0 ;

  constructor() {}

  addNumberOfUsers() : number { return this.numOfUsers ++ ; }

  subNumberOfUsers() : number {
    if(this.numOfUsers > 0)
      return this.numOfUsers -- ;
    else
      throw new Error('Operazione NON Eseguibile');
  }

  addNumberOfPosts() : number { return this.numOfPosts ++ ; }

  subNumberOfPosts() : number {
    if(this.numOfPosts > 0)
      return this.numOfPosts -- ;
    else
      throw new Error('Operazione NON Eseguibile');
  }

}
