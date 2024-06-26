import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../../State/Order/order.service';
import { AppState } from '../../../../Models/AppState';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  products=[1,1,1]
  order:any
  

  constructor(
    private activatedRoute:ActivatedRoute,
    private orderService:OrderService,
    private store:Store<AppState>
  ){}

  ngOnInit(){
    let id=this.activatedRoute.snapshot.paramMap.get("id")
    console.log("id",id)
    if(id){
      this.orderService.getOrderById(id);
    }

    this.store.pipe(select(store=>store.order)).subscribe((order)=>{
      this.order=order.order
    })
  }

}
