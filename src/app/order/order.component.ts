import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OrderStateService } from '../services/order-state.service';
import { tap } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  router = inject(Router);
  orderStateService = inject(OrderStateService);
  dataService = inject(DataService);
  drinkItemSelected = false;
  hookahSelected = false;

  totalPrice: number = 0;

  ngOnInit() {
    this.orderStateService.getOrderItems$()
      .pipe(
        tap((items) => {
          if (Object.keys(items).length === 0) return;
          this.totalPrice = items.reduce((sum, current) => sum + current.price, 0);

          items.forEach((item) => {
            if (item.type === 1) this.drinkItemSelected = true;
            if (item.type === 2) this.hookahSelected = true;
          })
        })
      ).subscribe();
  }

  navigate(step: number) {
    this.router.navigate([`/order/${step}`])
  }
}
