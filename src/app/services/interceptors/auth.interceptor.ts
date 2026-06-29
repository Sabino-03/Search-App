import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../auth.service";

export const AuthInterceptor : HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {

    const authService = inject(AuthService);
    const token = authService.getToken();

    if(!token)
        return next(req);

    const cloneReq = req.clone({setHeaders : {Authorization : `Bearer ${token}`}});

    return next(cloneReq);

}
