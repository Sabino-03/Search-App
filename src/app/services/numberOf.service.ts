import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class NumberOfService {

  private numOfUsers : number = 0;
  private numOfPosts : number = 0;

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

  getNumberOfUsers() : number { return this.numOfUsers; }

  getNumberOfPosts() : number { return this.numOfPosts; }

  reset() {
    this.numOfUsers = 0;
    this.numOfPosts = 0;
  }

}
