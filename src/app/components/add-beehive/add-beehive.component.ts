import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, take } from 'rxjs';
import { BeeHivesService } from 'src/app/services/hives.service';
import { HttpService } from 'src/app/services/http.service';
import { BeeGardenService } from 'src/app/services/beegarden.service';

@Component({
  selector: 'app-add-beehive',
  templateUrl: './add-beehive.component.html',
  styleUrls: ['./add-beehive.component.scss']
})
export class AddBeehiveComponent implements OnInit {
  formInput?: FormGroup;
  loading = false;
  beeGardenId = '';
  hasError = false;
  beeGarden: any;
  errorMsg = 'Нещо се обърка. Моля опитайте пак.';

  constructor(
    private _route: ActivatedRoute,
    private _beeHivesService: BeeHivesService,
    private _router: Router,
    private _beeGardenService: BeeGardenService
  ) { }

  ngOnInit(): void {
    this.beeGardenId = this._route.snapshot.params['id'];
    this._beeGardenService
      .getBeeGardenById(this.beeGardenId as string)
      .pipe(take(1))
      .subscribe((res: any = {}) => (this.beeGarden = res));
    this.formInput = new FormGroup({
      name: new FormControl(null, Validators.required),
      line: new FormControl(null, Validators.required)
    });
  }

  goBack() {
    this._router.navigateByUrl(`/beegardens/${this.beeGardenId}`);
  }

  onSubmit(form: FormGroup) {
    const { name, line } = form.value;
    console.log(name, line);
    this.loading = true;

    if (isNaN(line)) {
      throw new Error('Моля, въведете само цифри за Ред');
    }
    if (line <= 0) {
      throw new Error('Ред, трябва да е по-голямо от 0');
    }
    this._beeHivesService
      .addHive({ name, line, id: this.beeGardenId })
      .pipe(first())
      .subscribe({
        next: () => {
          this.loading = false;
          this._router.navigate([`/beegardens/${this.beeGardenId}`]);
        },
        error: (err: any) => {
          this.loading = false;
          this.hasError = true;
          if (err.error.msg) {
            this.errorMsg = err.error.msg;
          }
        }
      });
  }
}
