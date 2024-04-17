import { Injectable } from "@angular/core";
import { BASE_API_URL } from "../../config/api";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { catchError, map, of } from "rxjs";
import { deleteProductFailure, deleteProductSuccess, findProductByCategoryFailure, findProductByCategorySuccess, findProductByIdFailure, findProductByIdSuccess, saveProductFailure, saveProductSucces } from "./product.action";
import { error } from "console";

@Injectable({
    providedIn: 'root',
})

export class ProductService {
    API_BASE_URL = BASE_API_URL;

    private getHeader(): HttpHeaders {
        const token = localStorage.getItem("jwt")
        return new HttpHeaders().set("Authorization", `Bearer ${token}`);
    }

    constructor(
        private store: Store,
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    findProductsByCategory(reqData: any) {
        const {
            colors,
            sizes,
            minPrice,
            maxPrice,
            minDiscount,
            category,
            stock,
            sort,
            pageNumber,
            pageSize
        } = reqData;

        let params = new HttpParams()
            .set("colors", colors)
            .set("sizes", sizes)
            .set("minPrice", minPrice)
            .set("maxPrice", maxPrice)
            .set("minDiscount", minDiscount)
            .set("category", category)
            .set("stock", stock)
            .set("sort", sort)
            .set("pageNumber", pageNumber)
            .set("pageSize", pageSize);

        const headers = this.getHeader();

        return this.http.get(`${this.API_BASE_URL}/api/products`, { headers, params }).pipe(map((data: any) => {
            console.log("products data", data)
            return findProductByCategorySuccess({ payload: data })
        }),
        catchError((error: any) => {
            return of(findProductByCategoryFailure(
                error.response && error.response.data.message ?
                    error.response.data.message : error.message
            )
            );
        })
        ).subscribe((action)=>this.store.dispatch(action));
    }

    findProductsById(productId: any) {
        const headers = this.getHeader();

        return this.http.get(`${this.API_BASE_URL}/api/products/id/${productId}`, { headers}).pipe(map((data: any) => {
            console.log("product details", data)
            return findProductByIdSuccess({ payload: data })
        }),
        catchError((error: any) => {
            return of(findProductByIdFailure(
                error.response && error.response.data.message ?
                    error.response.data.message : error.message
            ))
        })
        ).subscribe((action)=>this.store.dispatch(action));
    }

    saveNewProduct(product:any){
        const headers = this.getHeader();

        return this.http.post(`${this.API_BASE_URL}/api/admin/products/`, product, {headers}).pipe(
            map((data:any) =>{
                return saveProductSucces({ payload: data });
            }),
            catchError((error:any)=>{
                return of(saveProductFailure(
                    error.response && error.response.data.message ?
                        error.response.data.message : error.message
                ))
            })
        ).subscribe((action)=>this.store.dispatch(action));
    }

    saveProduct(product:any){
        const headers = this.getHeader();

        return this.http.put(`${this.API_BASE_URL}/api/admin/products/${product.id}`, product, {headers}).pipe(
            map((data:any) =>{
                return saveProductSucces({ payload: data });
            }),
            catchError((error:any)=>{
                return of(saveProductFailure(
                    error.response && error.response.data.message ?
                        error.response.data.message : error.message
                ))
            })
        ).subscribe((action)=>this.store.dispatch(action));
    }
    

    deleteProduct(productId: any) {
        const headers = this.getHeader();

        return this.http.delete(`${this.API_BASE_URL}/api/admin/products/${productId}/delete`, { headers }).pipe(
            map((data: any) => {
                console.log("Product deleted successfully", data);
                return deleteProductSuccess({ productId });
            }),
            catchError((error: any) => {
                return of(deleteProductFailure(
                    error.response && error.response.data.message ?
                        error.response.data.message : error.message
                ));
            })
        ).subscribe((action) => this.store.dispatch(action));
    }

}