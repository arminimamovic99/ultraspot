import { hookahs, drinks } from './../mock/items';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { IOrderItem } from '../models/order-item';
import { OrderStateService } from '../services/order-state.service';

@Component({
  selector: 'app-order-step',
  templateUrl: './order-step.component.html',
  styleUrls: ['./order-step.component.scss']
})
export class OrderStepComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  orderStateService = inject(OrderStateService);
  step: number = 1;

  isBottomSheetOpen = false;
  orderItems: any[] = [];
  items: IOrderItem[] = [];
  ngOnInit(): void {
    this.route.params.pipe(
      tap((data: any) => {
        this.step = +data.stepId
        if (this.step === 1) this.items = drinks;
        else if (this.step === 2) this.items = hookahs
      })
    ).subscribe();

    this.orderStateService.getOrderItems$()
      .pipe(
        tap((data) => {
          if (Object.keys(data).length === 0) return;
          data.forEach((item) => {
            if (item.type === this.step) this.orderItems.push(item.id)
          })
        })
      ).subscribe()
  }

  addItemToOrder(id: number) {
    if (this.step === 2) {
      return this.openBottomSheet();
    }
    this.orderItems.push(id);
  }

  removeItemFromOrder(id: number) {
    this.orderItems.splice(this.orderItems.indexOf(id), 1);
  }

  backToMainOrderScreen() {
    this.emitOrderState();
    this.router.navigate(['../order']);
  }

  emitOrderState() {
    const itemsToEmit: IOrderItem[] = [];
    this.orderItems.forEach((id: number) => {
      const item = this.items.find((item) => item.id === id);
      if (!item) return;
      itemsToEmit.push(item);
    })

    this.orderStateService.emitOrderItems(itemsToEmit);
  }

  openBottomSheet() {
    this.isBottomSheetOpen = true;
  }

  closeBottomSheet() {
    this.isBottomSheetOpen = false;
  }
}
