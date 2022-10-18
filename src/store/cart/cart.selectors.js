import { createSelector } from "reselect";

/* const INITIAL_STATE = {
  cartItems: [],
  totalItems: 0,
  totalCost: 0,
  totalItemCount: 0,
  cartDropdownOpen: false,
}; */

const selectCartReducer = (state) => state.cart;

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
