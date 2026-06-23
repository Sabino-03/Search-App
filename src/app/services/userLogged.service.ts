import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserLoggedService {

    userLogged$ : BehaviorSubject<string> = new BehaviorSubject<string>('Utente');

    setUserLogged( username : string ) : void { this.userLogged$.next(username); }

    getUserLogged() : string { return this.userLogged$.getValue(); }

}
