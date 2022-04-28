import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('userData') as string);
    if (!userData) {
      return;
    }
    this.userService.autoLogin(userData);
  }
}
