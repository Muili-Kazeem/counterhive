import { Auth, authState } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

export class loginGuard implements CanActivate {
  constructor(
    private fireAuth: Auth,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    return authState(this.fireAuth)
      .pipe(
        // tap(auth => { console.log(auth)}),
        map(auth => {
          if(!auth) {
            this.router.navigate(['/auth'])
            return false;
          } else {
            return true;
          }
        })
      )
  }

}
