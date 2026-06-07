import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { catchError, first, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor( private authService : AuthService ) {}

    canActivate( //METODO INVOCATO AUTOMATICAMENTE DA PARTE DI ROUTER
        route : ActivatedRouteSnapshot, //DATI PER LA ROUTE
        state : RouterStateSnapshot, // URL PER LA ROUTE
    ) : Observable<boolean> {

        console.log(`Router Data : ${route.data}`);
        console.log(`Router Params : ${route.params}`);
        console.log(`Router URL : ${route.url}`);
        console.log(`State Root : ${state.root}`);
        console.log(`State URL (URL Richiesto) : ${state.url}`);

        return this.authService.isLoggedIn$
        .pipe(
          first(),
          tap((isAuth : boolean) => {
            if(isAuth === true) {

              console.log('Utente Autenticato');
              return true;

            }
            else {

              console.log('Utente NON Autenticato');
              return false;

            }
          })
        )

    }

}
