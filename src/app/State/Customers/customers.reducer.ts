import { createReducer, on } from "@ngrx/store";
import { getCustomers, getCustomersFailure, getCustomersSuccess } from "./customers.action";

const initialState = {
    customers: null,
    loading: false,
    error: null
}

export const customerReducer = createReducer(
    initialState,
    on(getCustomers, (state) => ({ ...state, loading: true, error: null })),
    on(getCustomersSuccess, (state, { customers }) => ({ ...state, loading: false, error: null, customers })),
    on(getCustomersFailure, (state, { error }) => ({ ...state, loading: true, error: error })),

)