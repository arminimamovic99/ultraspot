import { hookahs, drinks, flavors } from './../mock/items';
import { Component, EventEmitter, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, tap } from 'rxjs';
import { IHookahOptions, IOrderItem } from '../models/order-item';
import { OrderStateService } from '../services/order-state.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-order-step',
  templateUrl: './order-step.component.html',
  styleUrls: ['./order-step.component.scss']
})
export class OrderStepComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  orderStateService = inject(OrderStateService);
  dataService = inject(DataService);
  step: number = 1;

  cupType: string = 'Keramicki';
  flavorSettings: string[] = [];
  isBottomSheetOpen = false;
  orderItems: any[] = [];
  items: IOrderItem[] = [];
  allTypeItems: IOrderItem[] = [];
  flavors = flavors;
  selectedHookah?: number;
  hookahOptions?: IHookahOptions;
  toggleSheetVisible$ = new EventEmitter<boolean>();

  ngOnInit(): void {
  this.dataService.getItems()
    .pipe(
      tap((data) => {
        this.allTypeItems = data;
        if (this.step === 1) this.items = data.filter((item) => item.type === 1)
        if (this.step === 2) this.items = data.filter((item) => item.type === 2)
      }
      )
    ).subscribe();

    this.route.params.pipe(
      tap((data: any) => {
        this.step = +data.stepId
      })
    ).subscribe();

    this.orderStateService.getOrderItems$()
      .pipe(
        tap((data) => {
          if (Object.keys(data).length === 0) return;
          data.forEach((item) => {
            if (!this.orderItems.includes(item.id)) {
              this.orderItems.push(item.id)
            }
          })
        })
      ).subscribe()
  }

  addItemToOrder(id: number) {
    if (this.step === 2) {
      this.selectedHookah = id;
      return this.openBottomSheet();
    }
    this.orderItems.push(id);
  }


  getAmountOfItemInOrder(id: number) {
    return this.orderItems.filter((item) => item === id)?.length;
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
      let item = this.allTypeItems.find((item) => item.id === id);
      if (!item) return;
      if (item.type === 2) {
        item = {
          ...item,
          options: this.hookahOptions
        }
      }
      itemsToEmit.push(item);
    })

    this.orderStateService.emitOrderItems(itemsToEmit);
  }

  openBottomSheet() {
    this.isBottomSheetOpen = true;
  }

  closeBottomSheet() {
    this.isBottomSheetOpen = false;
    this.toggleSheetVisible$.emit(false);
  }

  selectCup(data: string) {
    this.cupType = data;
  }

  setFlavor(data: string) {
    if (this.flavorSettings.includes(data)) {
      const fromArr = this.flavorSettings.find((str) => str === data);
      if (!fromArr) return
      const index = this.flavorSettings.indexOf(fromArr);
      this.flavorSettings.splice(index, 1);
      return;
    }
    this.flavorSettings.push(data);
  }


  configureHookahAndEmit() {
    this.hookahOptions = {
      cupType: this.cupType,
      flavorSettings: this.flavorSettings
    }
    this.orderItems.push(this.selectedHookah);
    this.emitOrderState();

    this.isBottomSheetOpen = false;
    this.toggleSheetVisible$.emit(false);
  }
}
