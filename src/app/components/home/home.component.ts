import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { BeeGardenService } from 'src/app/services/beegarden.service';
import { IBeeGarden } from 'src/app/interfaces/interfaces';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fromLeftAnim', [
      transition(':enter', [
        query('.anim', [
          style({ opacity: 0, transform: 'translateX(-40px)' }),
          stagger('500ms', [
            animate('800ms 1.2s ease-out',
              style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ]),
    ]),
    trigger('fromRightAnim', [
      transition(':enter', [
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
      transition(':enter', [
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
  beeGardens?: IBeeGarden[];

  constructor(private beeGardenService: BeeGardenService) { }

  ngOnInit(): void {
    this.getBeeGardens();
  }

  getBeeGardens() {
    this.beeGardenService
      .getRecentBeeGardens()
      .pipe(take(1))
      .subscribe((res) => (this.beeGardens = res));
  }
}


