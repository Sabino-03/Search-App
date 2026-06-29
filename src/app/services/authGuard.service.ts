import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

export const AuthGuard : CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  console.log(`Router URL : ${route.url}`);
  console.log(`State URL (URL Richiesto) : ${state.url}`);

  return authService.isLoggedIn$.getValue() ? true : router.createUrlTree(['']);

}
