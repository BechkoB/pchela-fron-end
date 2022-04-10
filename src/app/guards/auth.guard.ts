import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private authService: UserService) {}

  canActivate(): boolean | UrlTree {
    if (!this.authService.isUserLoggedIn()) {
      this._router.navigate(['login']);
      return false;
    }

    return true;
  }
}
