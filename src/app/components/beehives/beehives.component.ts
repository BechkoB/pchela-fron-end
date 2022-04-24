import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, BehaviorSubject } from 'rxjs';
import { BeeHivesService } from '../../services/hives.service';
import { DialogService } from 'src/app/services/dialog.service';
import { BeeGardenService } from 'src/app/services/beegarden.service';
import { IBeeGarden } from '../../interfaces/interfaces'

@Component({
  selector: 'app-beehives',
  templateUrl: './beehives.component.html',
  styleUrls: ['./beehives.component.scss']
})
export class BeehivesComponent implements OnInit {

  beeGarden!: IBeeGarden;
  beeGardenId: string = '';
  beeHives: any;
  private _beeGardenId = new BehaviorSubject<string>('');
  showAddBtn: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _beeGardenService: BeeGardenService,
    private _beeHiveService: BeeHivesService,
    private _dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.beeGardenId = this._route.snapshot.params['id'];
    this._beeGardenId.next(this.beeGardenId);
    Promise.all([
      this._getBeeGardens(),
      this._getBeeHives()
    ]);
    this.checkOwner();
  }

  private _getBeeGardens() {
    const user = JSON.parse(localStorage.getItem('userData') as string);
    this._beeGardenService
      .getBeeGardenById(this.beeGardenId as string)
      .pipe(take(1))
      .subscribe((res) => {
        this.beeGarden = res;
        if (res.ownerId === user.userId) {
          this.showAddBtn = true;
        }
      });
  }

  private _getBeeHives() {
    this._beeHiveService
      .getBeeHives(this.beeGardenId as string)
      .pipe(take(1))
      .subscribe((res) => (this.beeHives = res));
  }

  checkOwner() {
    console.log(this.beeGarden);
  }
  onClick(id: string) {
    return this._router.navigate([
      `/beegardens/${this.beeGarden._id}/beehives/${id}`
    ]);
  }

  addHive() {
    return this._router.navigate([
      `/beegardens/${this.beeGarden._id}/addbeehive/`
    ]);
  }

  onDelete(event: MouseEvent, id: string) {
    event.stopPropagation();
    event.preventDefault();

    this._dialogService
      .openConfirmDialog()
      .afterClosed()
      .subscribe((response) => {
        if (!response) {
          return;
        }

        this._deleteBeeHive(id);
      });
  }

  private _deleteBeeHive(id: string) {
    this._beeHiveService
      .deleteHive(id)
      .pipe(take(1))
      .subscribe(() => this._getBeeHives());
  }

  get getCurrentGardenId() {
    return this._beeGardenId.asObservable();
  }


  // get isOwner() {
  //   const user = JSON.parse(localStorage.getItem('userData') as string);
  //   // this._getBeeGardens();
  //   if (user) {
  //     if (this.beeGarden.ownerId === user.userId) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  //   return false;
  // }
}
