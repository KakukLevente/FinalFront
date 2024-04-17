import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, of } from 'rxjs';
import { BASE_API_URL } from '../../config/api';
import {
    createOrderFailure,
    createOrderSuccess,

    getOrderByIdSuccess,

    getOrderHistoryFailure,
    getOrderHistorySuccess,
    getOrderHistoryRequest,
    getOrderByIdFailure,

} from './order.action';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private API_BASE_URL = BASE_API_URL;
    private headers;

    constructor(
        private store: Store,
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        });
    }

    createOrder(reqData: any) {
        console.log('create order', reqData);
        const url = `${this.API_BASE_URL}/api/orders/`;

        return this.http
            .post(url, reqData, { headers: this.headers })
            .pipe(
                map((data: any) => {
                    console.log('created order', data);
                    if (data.id) {
                        this.router.navigate([`/checkout/payment/${data.id}`], {
                            queryParams: { step: '3', order_id: data.id },
                        });
                    }
                    console.log('created order -', data);
                    return createOrderSuccess({ order: data });
                }),
                catchError((error: any) => {
                    console.log('catch error:', error);
                    return of(
                        createOrderFailure(
                            error.response && error.response.data.message
                                ? error.response.data.message
                                : error.message
                        )
                    );
                })
            )
            .subscribe((action) => this.store.dispatch(action));
    }

    getOrderById(orderId: string) {
        const url = `${this.API_BASE_URL}/api/orders/${orderId}`;

        return this.http
            .get(url, { headers: this.headers })
            .pipe(
                map((data: any) => {
                    console.log('order by id', data);
                    return getOrderByIdSuccess({ order: data });
                }),
                catchError((error: any) => {
                    console.log('catch', error);
                    return of(
                        getOrderByIdFailure(
                            error.response && error.response.data.message
                                ? error.response.data.message
                                : error.message
                        )
                    );
                })
            )
            .subscribe((action) => this.store.dispatch(action));
    }

    getOrderHistory() {
        const url = `${this.API_BASE_URL}/api/orders/user`;

        return this.http
            .get(url, { headers: this.headers })
            .pipe(
                map((data) => {
                    console.log('order history', data);
                    return getOrderHistorySuccess({ orders: data });
                }),
                catchError((error: any)=>{
                    return of(
                        getOrderHistoryFailure(
                            error.response && error.response.data.message
                                ? error.response.data.message
                                : error.message
                        )
                    );
                })
            )
            .subscribe((action) => this.store.dispatch(action));
    }
    
}