import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { IBeeGarden, IUser } from 'src/app/interfaces/interfaces';
import { BeeGardenService } from 'src/app/services/beegarden.service';
import { DialogService } from 'src/app/services/dialog.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  loading = false;
  hasError = false;
  errorMsg = 'Нещо се обърка. Моля опитайте пак.';
  isInEditMode = false;
  currentUser: IUser;
  profileForm: FormGroup;
  beeGarden: IBeeGarden;

  constructor(
    private _httpService: HttpService,
    private _dialogService: DialogService,
    private _beeGardenService: BeeGardenService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const userData = JSON.parse(localStorage.getItem('userData') as string);
    this._httpService.get(`user/${userData.userId}`).pipe(take(1)).subscribe((res: any) => {
      this.currentUser = res.user;
      this.initForm();
      this.fetchGardenByOwnerId(this.currentUser._id);
    });
  }

  fetchGardenByOwnerId(ownerId: string): void {
    this._httpService.get(`beegardens/owner/${ownerId}`).pipe(take(1)).subscribe((res: any) => {
      this.beeGarden = res?.garden;
    })
  }

  initForm(): void {
    this.profileForm = new FormGroup({
      email: new FormControl({ value: this.currentUser?.email || '', disabled: true }, [Validators.required]),
      phone: new FormControl({ value: this.currentUser?.phone || '', disabled: true }, [
        Validators.required,
        Validators.minLength(10)
      ]),
      firstName: new FormControl({ value: this.currentUser?.firstName || '', disabled: true }, [Validators.minLength(3)]),
      secondName: new FormControl({ value: this.currentUser?.secondName || '', disabled: true }, [Validators.minLength(3)])
    });
  }

  enableEditMode(): void {
    this.isInEditMode = true;
    this.profileForm.enable();
  }

  onEditUser(): void {
    const userData = JSON.parse(localStorage.getItem('userData') as string);

    const body = {
      email: this.profileForm.get('email')?.value,
      firstName: this.profileForm.get('firstName')?.value,
      secondName: this.profileForm.get('secondName')?.value,
      phone: this.profileForm.get('phone')?.value
    }
    console.log(this.profileForm.get('email')?.value);
    console.log(this.profileForm.get('firstName')?.value);
    console.log(this.profileForm.get('secondName')?.value);
    console.log(this.profileForm.get('phone')?.value);
    console.log(userData.userId);

    this._httpService.patch(`user/edit/${userData.userId}`, body)
      .pipe(take(1))
      .subscribe((res: any) => {
        console.log(res);
        this.currentUser = res;
        this.isInEditMode = false;
        this.profileForm.disable()
      });
  }

  onCancel(): void {
    this.isInEditMode = false;
    this.profileForm.disable()
  }

  onDelete(event: Event, id: string) {
    event.stopPropagation();
    event.preventDefault();

    this._dialogService
      .openConfirmDialog()
      .afterClosed()
      .subscribe((response) => {
        if (!response) {
          return;
        }
        this.deleteBeeGarden(id);
      });
  }

  deleteBeeGarden(id: string): void {
    this._beeGardenService.deleteBeeGarden(id)
      .pipe(take(1))
      .subscribe(() => {
        this.fetchData();
        this.isInEditMode = false;
      })
  }
}
