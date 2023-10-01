import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IOrderItem } from '../models/order-item';

@Injectable({
  providedIn: 'root'
})
export class OrderStateService {
  orderItems$ = new BehaviorSubject<IOrderItem[]>({} as IOrderItem[]);
  constructor() { }

  emitOrderItems(items: IOrderItem[]) {
    this.orderItems$.next(items);
  }

  getOrderItems$(): Observable<IOrderItem[]> {
    return this.orderItems$;
  }
}
