/*
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, first, mergeMap, Observable, of } from "rxjs";
import { AuthService } from "../auth.service";

export class AuthInterceptor implements HttpInterceptor {

    public cloneReq : Observable<HttpEvent<any>> = new Observable();

    constructor( private authService : AuthService ) {}
    
    //SI IMPLEMENTA METODO intercept -> ESSO RESTITUISCE UN OBSERVABLE
    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        //req -> RICHIESTA ATTUALE CHE VIENE ESEGUITA
        //next -> UTILITY PER PASSARE AL SUCCESSIVO interceptor

        return this.authService.isLoggedIn$
        .pipe(
            first(),
            mergeMap((token : boolean) => {
                let cloneReq = req;

                if(token)
                    cloneReq = req.clone( {setHeaders : {Authorization : `Bearer ${token}`}} );

                return next.handle(cloneReq)
                .pipe(
                    catchError((err) => {

                        console.log(err); //OUT : HTTPErrorResponse

                        if(err instanceof HttpErrorResponse) {
                            switch (err.status) {
                                case 401 : {
                                    //TOKEN SCADUTO
                                }
                                    break;

                                case 404 : {
                                    //SERVER DOWN

                                    this.authService.removeToken();
                                }
                                    break;

                                default : {}
                            }

                            return of(err);

                        }

                    })
                )
            })
        )

    }

}
*/
