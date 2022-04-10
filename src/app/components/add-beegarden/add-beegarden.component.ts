import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { BeeGardenService } from 'src/app/services/beegarden.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-beegarden',
  templateUrl: './add-beegarden.component.html',
  styleUrls: ['./add-beegarden.component.scss']
})
export class AddBeegardenComponent implements OnInit {
  formInput?: FormGroup;
  loading = false;
  hasError = false;
  errorMsg = 'Нещо се обърка. Моля опитайте пак.';

  constructor(
    private _beeGardenService: BeeGardenService,
    private _router: Router,
    private _httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.formInput = new FormGroup({
      name: new FormControl(null, Validators.required),
      lat: new FormControl(null, Validators.required),
      lng: new FormControl(null, Validators.required)
    });
  }

  onSubmit(form: FormGroup) {
    this.loading = true;
    const { name, lat, lng } = form.value;

    if (isNaN(lat) || isNaN(lng)) {
      this.loading = false;
      return this._handleError('Моля, въведете само цифри за координатите');
    }

    this._beeGardenService
      .addGarden({ name, lat, lng })
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          return this._router.navigate([`/beegardens/${response.id}`]);
        },
        error: (err: any) => {
          this.loading = false;

          if (err.error.msg) {
            this._handleError(err.error.msg);
          }
        }
      });
  }

  private _handleError(errorMessage: string) {
    this.hasError = true;
    this.errorMsg = errorMessage;
  }

}
