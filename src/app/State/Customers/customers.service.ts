import { Injectable } from "@angular/core";
import { BASE_API_URL } from "../../config/api";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { catchError, map, of } from "rxjs";
import { getCustomersFailure, getCustomersSuccess } from "./customers.action";

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private apiUrl = BASE_API_URL + "/api";
  headers: any;

  constructor(private http: HttpClient, private store: Store) {
    
  }

  getCustomers() {
    const headers=this.headers = new HttpHeaders().set("Authorization",`Bearer ${localStorage.getItem("jwt")}`);
    return this.http.get(`${this.apiUrl}/users/customers`, { headers }).pipe(
      map((users: any) => {
        console.log('get customers success', users);
        return getCustomersSuccess({ customers: users });
      }),
      catchError((error) => {
        return of(
          getCustomersFailure(
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          )
        );
      })
    ).subscribe((action) => this.store.dispatch(action));
  }

  deleteCustomer(user: any){
    const headers=this.headers = new HttpHeaders().set("Authorization",`Bearer ${localStorage.getItem("jwt")}`);
    const body= user;
    return this.http.delete(`${this.apiUrl}/users/customers`, { body, headers }).pipe(
      map((users: any) => {
        console.log('delete customer success', users);
        return getCustomersSuccess({ customers: users });
      }),
      catchError((error) => {
        return of(
          getCustomersFailure(
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          )
        );
      })
    ).subscribe((action) => this.store.dispatch(action));
  }

  updateCustomer(user: any){
    const headers=this.headers = new HttpHeaders().set("Authorization",`Bearer ${localStorage.getItem("jwt")}`);
    const body= user;
    return this.http.put(`${this.apiUrl}/users/customers`, body, { headers }).pipe(
      map((users: any) => {
        console.log('update customer success', users);
        return getCustomersSuccess({ customers: users });
      }),
      catchError((error) => {
        return of(
          getCustomersFailure(
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          )
        );
      })
    ).subscribe((action) => this.store.dispatch(action));
  }

}