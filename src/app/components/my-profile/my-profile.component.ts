import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { IBeeGarden, IUser } from 'src/app/interfaces/interfaces';
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

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser() {
    const userData = JSON.parse(localStorage.getItem('userData') as string);
    this.httpService.get(`user/${userData.userId}`).pipe(take(1)).subscribe((res: any) => {
      this.currentUser = res.user;
      this.initForm();
    });
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

  enableEditMode(user: IUser): void {
    this.isInEditMode = true;
    this.profileForm.enable();
  }

  onEditUser(): void {

  }

  onCancel(): void {
    this.isInEditMode = false;
    this.profileForm.disable()
  }

}
