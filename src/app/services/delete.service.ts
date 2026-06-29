import { inject, Injectable } from "@angular/core";
import { NumberOfService } from "./numberOf.service";

//SERVICE IL QUALE È UN INTERMEDIARIO (PROXY) INUTILE . [INCORPORA METODI CHE IMPLEMENTANO OPERAZIONI -> INUTILI]
/*
@Injectable({ providedIn: 'root' })
export class DeleteService {

  private numberOfService = inject(NumberOfService);

  resetCounters() {
    this.numberOfService.numOfUsers = 0 ;
    this.numberOfService.numOfPosts = 0 ;
  }

}
*/
