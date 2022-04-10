import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;
  errorMsg = 'Нещо се обърка. Моля опитайте пак.';
  hasError = false;

  constructor(private task: UserService, private router: Router) {}

  ngOnInit(): void {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    checked: new FormControl('false')
  });

  onLogin(form: { value: any }) {
    this.loading = true;
    const { email, password } = form.value;

    this.task
      .login(email, password)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.hasError = true;
          this.loading = false;
          if (error.error.msg) {
            this.errorMsg = error.error.msg;
          }
        }
      });
  }
}
