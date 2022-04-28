import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { BeeHivesService } from '../../services/hives.service';
import { DialogService } from 'src/app/services/dialog.service';
import { BeeGardenService } from 'src/app/services/beegarden.service';
import { IBeeGarden, IBeeHive } from '../../interfaces/interfaces';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-beehives',
  templateUrl: './beehives.component.html',
  styleUrls: ['./beehives.component.scss']
})
export class BeehivesComponent implements OnInit {

  beeGarden!: IBeeGarden;
  beeGardenId: string = '';
  beeHives: IBeeHive[] = [];
  isOwner = false;
  showBtn = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _beeGardenService: BeeGardenService,
    private _beeHiveService: BeeHivesService,
    private _dialogService: DialogService,
    private _sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.beeGardenId = this._route.snapshot.params['id'];
    this._getBeeGardens();
    this._getBeeHives();
    this._sharedService.ownerStatusGetter.pipe(take(1)).subscribe(value => {
      this.isOwner = value;
    });
  }

  private _getBeeGardens() {
    this._beeGardenService
      .getBeeGardenById(this.beeGardenId as string)
      .pipe(take(1))
      .subscribe((beeGarden) => {
        this.beeGarden = beeGarden;
        this._sharedService.updateOwnerStatus(this.checkForOwner(beeGarden));
      });
  }

  private _getBeeHives() {
    this._beeHiveService
      .getBeeHives(this.beeGardenId as string)
      .pipe(take(1))
      .subscribe((res) => (this.beeHives = res));
  }

  checkForOwner(beeGarden: IBeeGarden): boolean {
    const user = JSON.parse(localStorage.getItem('userData') as string);
    if (user) {
      if (beeGarden.ownerId === user.userId) {
        this.showBtn = true;
        return true;
      }
    }
    this.showBtn = false;
    return false;
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
}
