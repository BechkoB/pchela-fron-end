import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take, Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { BeeGardenService } from '../../services/beegarden.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-beegardens',
  templateUrl: './beegardens.component.html',
  styleUrls: ['./beegardens.component.scss']
})
export class BeeGardensComponent implements OnInit {
  loginStatus$!: Observable<boolean>;
  beeGardens: any;
  hasUser?: boolean;
  email = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private beeGardenService: BeeGardenService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.loginStatus$ = this.userService.isLoggedIn;

    const userData = JSON.parse(localStorage.getItem('userData') as string);

    if (!userData) {
      this.hasUser = false;
    } else {
      this.sharedService.currentEmail.subscribe(
        (newEmail) => (this.email = newEmail)
      );
      this.hasUser = this.userService.autoLogin(userData);
    }

    this.beeGardenService
      .getBeeGardens()
      .pipe(take(1))
      .subscribe((res) => (this.beeGardens = res));
  }

  onClick(event: any) {
    return this.router.navigate([`/beegardens/${event._id}`]);
  }

  addGarden() {
    return this.router.navigate(['/addbeegardens']);
  }
 
}
