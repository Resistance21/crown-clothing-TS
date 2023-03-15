import { createSelector } from "reselect";
import { CartState } from "./cart.reducer";
import { RootState } from "../store";

/* const INITIAL_STATE = {
  cartItems: [],
  totalItems: 0,
  totalCost: 0,
  totalItemCount: 0,
  cartDropdownOpen: false,
}; */
export const selectCartReducer = (state: RootState): CartState => {
  return state.cart;
};

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartSlice) => {
    return cartSlice.cartItems;
  }
);

export const selectCartTotal = createSelector(
  [selectCartReducer],
  (cartSlice) => {
    return cartSlice.totalCost;
  }
);

export const selectCartDropDownWindow = createSelector(
  [selectCartReducer],
  (cartSlice) => {
    return cartSlice.cartDropdownOpen;
  }
);

export const selectCartTotalItems = createSelector(
  [selectCartReducer],
  (cartSlice) => {
    return cartSlice.totalItems;
  }
);
