import { Injectable, inject } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IOrderItem } from '../models/order-item';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private itemsCollection: AngularFirestoreCollection<any>;
  private afs = inject(AngularFirestore);
  items: Observable<IOrderItem[]>;

  constructor() {
    this.itemsCollection = this.afs.collection<IOrderItem>('articles');
    this.items = this.itemsCollection.valueChanges();
  }

  getItems(): Observable<IOrderItem[]> {
    return this.items;
  }

  addItem(item: any): void {
    this.itemsCollection.add(item);
  }
}
