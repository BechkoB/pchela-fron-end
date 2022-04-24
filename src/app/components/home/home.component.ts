import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { UserService } from '../../services/user.service';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { BeeGardenService } from 'src/app/services/beegarden.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fromLeftAnim', [
      // When we enter the screen.
      transition(':enter', [
        // For every '.col' trigger an animation but make sure it is triggered 500ms
        // AFTER the previous '.col' element
        query('.anim', [
          style({ opacity: 0, transform: 'translateX(-40px)' }),
          stagger('200ms', [
            animate('800ms 1.2s ease-out',
              style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ]),
    ]),
    trigger('fromRightAnim', [
      // When we enter the screen.
      transition(':enter', [
        // For every '.col' trigger an animation but make sure it is triggered 500ms
        // AFTER the previous '.col' element
        query('.right', [
          style({ opacity: 0, transform: 'translateX(40px)' }),
          stagger('500ms', [
            animate('800ms 1.2s ease-out',
              style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ]),
    ]),
    trigger('fromBottom', [
      // When we enter the screen.
      transition(':enter', [
        // For every '.col' trigger an animation but make sure it is triggered 500ms
        // AFTER the previous '.col' element
        query('.up', [
          style({ opacity: 0, transform: 'translateY(40px)' }),
          stagger('500ms', [
            animate('800ms 1.2s ease-out',
              style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ]),
    ])
  ]
})
export class HomeComponent implements OnInit {
  loginStatus$!: Observable<boolean>;
  hasUser?: boolean;
  beeGardens: any;


  constructor(
    private userService: UserService,
    private beeGardenService: BeeGardenService,
    ) {}

  ngOnInit(): void {
    this.loginStatus$ = this.userService.isLoggedIn;

    const userData = JSON.parse(localStorage.getItem('userData') as string);

    if (!userData) {
      this.hasUser = false;
    } else {
      this.hasUser = this.userService.autoLogin(userData);
    }
    this.getBeeGardens();
  }

  getBeeGardens() {
    this.beeGardenService
    .getRecentBeeGardens()
    .pipe(take(1))
    .subscribe((res) => (this.beeGardens = res, console.log(res)));
  }
}


