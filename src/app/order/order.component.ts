import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OrderStateService } from '../services/order-state.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  router = inject(Router);
  orderStateService = inject(OrderStateService);
  drinkItemSelected = false;

  ngOnInit() {
    this.orderStateService.getOrderItems$()
      .pipe(
        tap((items) => {
          if (Object.keys(items).length === 0) return;
          console.log({items});

          items.forEach((item) => {
            if (item.type === 1) this.drinkItemSelected = true;
          })
        })
      ).subscribe();
  }

  navigate(step: number) {
    this.router.navigate([`/order/${step}`])
  }
}
