import { Injectable } from '@angular/core';
import { BehaviorSubject, first, map, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { IUserData } from '../interfaces/interfaces'


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly httpService: HttpService) {}

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
      }) as Observable<IUserData>
    ).pipe(
      first(),
      map((user: IUserData) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this._loginStatus.next(true);
        return this.setUserData(user);
      })
    );
  }

  register(email: string, password: string) {
    return (
      this.httpService.post('user/register', {
        email,
        password
      }) as Observable<IUserData>
    ).pipe(
      first(),
      map((user: IUserData) => this.setUserData(user))
    );
  }

  setUserData(user: IUserData) {
    const expireTime = 1555200000;
    user.tokenExpiresIn = new Date().getTime() + expireTime;
    localStorage.setItem('userData', JSON.stringify(user));
    localStorage.setItem('username', user.email);
    localStorage.setItem('loginStatus', '1');

    // if (user.userRole === 'Admin') {
    //   this._isAdmin.next(true);
    // }
    this._isAdmin.next(false);
    this._userName.next(localStorage.getItem('username') as string);
    return user;
  }

  isUserLoggedIn() {
    return !!localStorage.getItem('userData');
  }

  isAdminFunction() {
    const userData: IUserData = JSON.parse(
      localStorage.getItem('userData') as string
    );
    // if (userData.userRole === 'Admin') {
    //   return true;
    // }
    return false;
  }

  logoutUser(): void {
    this._loginStatus.next(false);
    this._isAdmin.next(false);
    localStorage.clear();
    localStorage.setItem('loginStatus', '0');
    this._userName.next('');
  }

  autoLogin(userData: IUserData) {
    if (
      userData.tokenExpiresIn &&
      new Date().getTime() < userData.tokenExpiresIn
    ) {
      this._loginStatus.next(true);
      // if (userData.userRole === 'Admin') {
      //   this._isAdmin.next(true);
      // }
      return true;
    }

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
