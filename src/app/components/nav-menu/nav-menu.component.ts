import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  constructor(private _task: UserService, private _router: Router) {}
  loginStatus$!: Observable<boolean>;
  userName$!: Observable<string>;
  isAdmin$!: Observable<boolean>;

  ngOnInit(): void {
    this.userName$ = this._task.currentUserName;
    this.loginStatus$ = this._task.isLoggedIn;
    this.isAdmin$ = this._task.isAdmin;
  }

  onLogout() {
    this._task.logoutUser();
    this._router.navigate(['login']);
  }
}
