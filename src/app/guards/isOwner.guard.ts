import { Injectable } from '@angular/core';
import { Observable, skip } from 'rxjs';
import { take } from 'rxjs/operators';


import { CanActivate, UrlTree } from '@angular/router';
import { SharedService } from '../services/shared.service';


@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivate {
  _isOwner$!: Observable<boolean>;
  isOwner: boolean = false;

  constructor(private _sharedService: SharedService) { }

  canActivate(): boolean | UrlTree {
    const userData = JSON.parse(localStorage.getItem('userData') as string);
    this._isOwner$! = this._sharedService.ownerStatusGetter

    this._isOwner$.pipe(take(1)).subscribe(value => this.isOwner = value);
    if (userData) {
      if (this.isOwner) {
        return true;
      }
    }
    return false;
  }
}
