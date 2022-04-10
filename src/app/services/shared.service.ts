import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { IBeeHiveData } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _email = new BehaviorSubject<string>('');
  allBeeHivaData: Array<IBeeHiveData> = [];
  currentEmail = this._email.asObservable();
  constructor() {}

  updateEmail(newEmail: string) {
    this._email.next(newEmail);
  }
  setData(newData: Array<IBeeHiveData>) {
    this.allBeeHivaData = newData;
  }
  getData() {
    return this.allBeeHivaData;
  }
}
