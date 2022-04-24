import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CanActivate, UrlTree } from '@angular/router';
import { BeehivesComponent } from '../components/beehives/beehives.component'
import { BeeGardenService } from '../services/beegarden.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivate {
  beeGardenId$!: Observable<string>;

  constructor(private beeHives: BeehivesComponent, private _beeGardenService: BeeGardenService,) { }

  canActivate(): boolean | UrlTree {
    const userData = JSON.parse(localStorage.getItem('userData') as string);
    this.beeGardenId$ = this.beeHives.getCurrentGardenId;
    console.log(this.beeGardenId$);
    // this._beeGardenService.getBeeGardenById(this.beeGardenId$);
    return false;
    // console.log(this.beeHives.isOwner);
    // return this.beeHives.isOwner;
  }
}
