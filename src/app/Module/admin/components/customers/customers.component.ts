import { Component } from '@angular/core';
import { CustomersService } from '../../../../State/Customers/customers.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../Models/AppState';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent  {
  customers: any;

  constructor(
    private customerService: CustomersService,
    private store: Store<AppState>){
    customerService.getCustomers().add(()=>{
      this.store.subscribe(state => console.log({ state }));
      this.store.pipe(select((store) => store.customers)).subscribe((customers) => {
        this.customers = customers?.customers;
        console.log("store data", this.customers)
      });

    });
  }


  deleteCustomer(user:any){
    this.customerService.deleteCustomer(user).add(()=>{
      this.store.pipe(select((store) => store.customers)).subscribe((customers) => {
        this.customers = customers?.customers;
        console.log("store data", this.customers)
      });

    });
  }

  updateCustomer(user:any){
    let updatedUser;
    if(user.role == 'ADMIN'){
      updatedUser = {
        ...user,
        role: 'USER'
      }
    }else{
      updatedUser = {
        ...user,
        role: 'ADMIN'
      }
    }
    this.customerService.updateCustomer(updatedUser).add(()=>{
      this.store.pipe(select((store) => store.customers)).subscribe((customers) => {
        this.customers = customers?.customers;
        console.log("store data", this.customers)
      });

    });
  }

}
