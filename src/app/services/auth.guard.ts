import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>{
    return this.authService.isAuth()
      .pipe(
        tap( estado=>{
          if(!estado){
            return this.router.navigate(['/login'])
          }
        })
      )


  }
}