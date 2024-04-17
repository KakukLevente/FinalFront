import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css'
})
export class OrderCardComponent {

  @Input() order: any;

  constructor(private router:Router){
    console.log(this.order)
  }

  navigateToOrderDetails=(id:Number)=>{

    this.router.navigate([`orders/${id}`])
  }

}
