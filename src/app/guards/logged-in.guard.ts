import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private _router: Router, private authService: UserService) { }

  canActivate(): boolean | UrlTree {
    if (this.authService.isUserLoggedIn()) {
      this._router.navigate(['/']);
      return false;
    }
    return true;
  }
}
