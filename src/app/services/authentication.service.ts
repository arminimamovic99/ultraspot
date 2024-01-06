import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  afAuth = inject(AngularFireAuth);
  user$: Observable<firebase.default.User | null>;

  constructor() {
    this.user$ = this.afAuth.authState;
  }

  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
       // window.alert(error.message);
      });
  }

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      // .then((result) => {
      //   console.log(result);
      // })
      // .catch((error) => {
      // // window.alert(error.message);
      // });
  }

  async SignOut() {
    return await this.afAuth.signOut();
  }


  async getIdToken() {
    const user = await this.afAuth.currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null;
  }
}
