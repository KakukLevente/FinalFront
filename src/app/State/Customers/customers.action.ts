import { createAction, props } from "@ngrx/store"

export const getCustomers=createAction('[Customers] Get Customers')

export const getCustomersSuccess=createAction('[Customers] Get Customers Success', props<{customers:any}>())

export const getCustomersFailure=createAction('[Customers] Get Customers Failure', props<{error:any}>())


