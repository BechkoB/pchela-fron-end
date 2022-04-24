import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { IBeeHiveData } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private isOwner$ = new BehaviorSubject<boolean>(false);

  allBeeHivaData: Array<IBeeHiveData> = [];
  constructor() { }

  updateOwnerStatus(ownerStatus: boolean) {
    this.isOwner$.next(ownerStatus);
  }

  get ownerStatusGetter() {
    return this.isOwner$.asObservable();
  }

  setData(newData: Array<IBeeHiveData>) {
    this.allBeeHivaData = newData;
  }
  getData() {
    return this.allBeeHivaData;
  }

}
