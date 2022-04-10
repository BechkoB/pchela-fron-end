import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading = false;
  hasError = false;
  errorMsg = 'Нещо се обърка. Моля опитайте пак.';

  constructor(private _task: UserService, private _router: Router) {}

  ngOnInit(): void {}

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    repass: new FormControl('', [Validators.required, Validators.minLength(6)]),
    checked: new FormControl('false')
  });

  onRegister(form: FormGroup) {
    this.loading = true;

    const { email, password, repass } = form.value;

    try {
      if (password !== repass) {
        throw new Error(`Паролите не съвпадат!`);
      }
      this._task
        .register(email, password)
        .pipe(first())
        .subscribe({
          next: () => {
            this._router.navigate(['/']);
          },
          error: (error) => {
            this.hasError = true;
            this.loading = false;
            this._router.navigate(['/login']);
          }
        });
    } catch (err: any) {
      this.hasError = true;
      this.loading = false;
      this.errorMsg = err.message;
    }
  }
}
