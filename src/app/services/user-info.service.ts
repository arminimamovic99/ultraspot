import { PanelModule } from 'primeng/panel';
import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private userInfoColletion: AngularFirestoreCollection<any>;
  private afs = inject(AngularFirestore);

  constructor() {
    this.userInfoColletion = this.afs.collection<any>('user_info');
  }

  setUserInfo(data: {id: string, role: string}) {
    this.userInfoColletion.add(data)
      .then((addUserRes) => console.log({addUserRes}));
  }
}
