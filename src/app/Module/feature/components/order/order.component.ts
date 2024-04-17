import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../../../State/Order/order.service';
import { AppState } from '../../../../Models/AppState';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  orderFilter=[
    {value:"on_the_way",label:"On The Way"},
    {value:"delievered",label:"Delivered"},
    {value:"cancelled",label:"Cancelled"},
    {value:"returned",label:"Returned"},
  ]
  orders: any;

  constructor(private router:Router,
    private store: Store<AppState>,
    private orderService: OrderService
  ){
    orderService.getOrderHistory().add(()=>{
      this.store.pipe(select((store) => store.order)).subscribe((data) => {
        this.orders = data.orders;
        console.log("store data", this.orders)
      })
  })


  }

  navigateToOrderDetails=(id:Number)=>{

    this.router.navigate([`/order/${id}`])
  }

}
