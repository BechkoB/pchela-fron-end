import { Injectable } from '@angular/core';
import { BehaviorSubject, first, map, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { IUser } from '../interfaces/interfaces'


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly httpService: HttpService) { }

  private _loginStatus = new BehaviorSubject<boolean>(false);
  private _isAdmin = new BehaviorSubject<boolean>(false);
  private _userName = new BehaviorSubject<string>(
    localStorage.getItem('username') as string
  );

  login(email: string, password: string) {
    return (
      this.httpService.post('user/login', {
        email,
        password
      }) as Observable<IUser>
    ).pipe(
      first(),
      map((user: IUser) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.setUserData(user);
      })
    );
  }

  register(email: string, password: string) {
    return (
      this.httpService.post('user/register', {
        email,
        password
      }) as Observable<IUser>
    ).pipe(
      first(),
      map((user: IUser) => this.setUserData(user))
    );
  }

  setUserData(user: IUser) {
    const expireTime = 1555200000;
    user.tokenExpiresIn = new Date().getTime() + expireTime;
    localStorage.setItem('userData', JSON.stringify(user));
    localStorage.setItem('username', user.email);
    this._userName.next(localStorage.getItem('username') as string);
    this._loginStatus.next(true);
    return user;
  }

  isUserLoggedIn() {
    return !!localStorage.getItem('userData');
  }

  logoutUser(): void {
    this._loginStatus.next(false);
    this._isAdmin.next(false);
    localStorage.clear();
    this._userName.next('');
  }

  autoLogin(userData: IUser) {
    if (new Date().getTime() < userData.tokenExpiresIn) {
      this._loginStatus.next(true);
      return true;
    }
    this.logoutUser()
    return false;
  }

  get isLoggedIn() {
    return this._loginStatus.asObservable();
  }

  get isAdmin() {
    return this._isAdmin.asObservable();
  }

  get currentUserName() {
    return this._userName.asObservable();
  }


}
