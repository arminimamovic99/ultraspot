import { CardModule } from 'primeng/card';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationService } from '../services/authentication.service';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authService = inject(AuthenticationService);
  router = inject(Router);
  messageService = inject(MessageService);
  loginOptionsExpanded = false;
  loginOption = 1;

  username: string = '';
  email: string = '';
  pword: string = '';

  displayError = false;
  messages!: Message[];

  showSuccessLogin = false;
  showSuccessSignup = false;

  constructor() {}

  navigate() {
    this.router.navigate(['/home']);
    this.messages = [{ severity: 'error', summary: 'Greska', detail: 'Netacni podaci' }];
    this.messageService.add({ key: 'login_success', severity: 'success', summary: 'Info', detail: 'Uspjesno ste se prijavili' });
    this.messageService.add({ key: 'signup_success', severity: 'success', summary: 'Info', detail: 'Uspjesno ste kreirali racun' });

  }

  initSignup() {
    this.authService.SignUp(this.email, this.pword)
      .then((res) => {
        console.log({res});
        this.router.navigate(['/home'])
        this.showSuccessSignup = true;
      });
  }

  initSignIn() {
    this.authService.SignIn(this.email, this.pword)
      .then((res) => {
        console.log({res});
        if (res === undefined) {
          this.displayError = true;
          return;
        }
        this.router.navigate(['/home?loginSuccess=true']);
        this.showSuccessLogin = true;

      })
      .catch((err) => {
      })
  }
}
