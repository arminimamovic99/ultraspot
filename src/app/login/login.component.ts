import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authService = inject(AuthenticationService);
  router = inject(Router);
  loginOptionsExpanded = false;
  loginOption = 1;

  username: string = '';
  email: string = '';
  pword: string = '';

  constructor() {}

  navigate() {
    this.router.navigate(['/home']);
  }

  initSignup() {
    this.authService.SignUp(this.email, this.pword)
      .then((res) => {
        console.log({res});
      });
  }

  initSignIn() {
    this.authService.SignIn(this.email, this.pword)
      .then((res) => {
        console.log({res});
      })
  }
}
