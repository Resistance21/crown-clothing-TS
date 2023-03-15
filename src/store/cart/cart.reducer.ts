import { AnyAction } from "redux";
import { cartItem } from "./cart.type";
import {
  addItemQuantityMatcher,
  subtractItemQuantityMatcher,
  removeItemMatcher,
  cartDropDownWindowToggelMatcher,
  addCartItemMatcher,
  cartTotalMatcher,
} from "./cart.actions";

export type CartState = {
  readonly cartItems: cartItem[];
  readonly totalItems: number;
  readonly totalCost: number;
  readonly cartDropdownOpen: boolean;
};
export const INIT_CART_STATE: CartState = {
  cartItems: [],
  totalItems: 0,
  totalCost: 0,
  cartDropdownOpen: false,
};

export const cartReducer = (
  state = INIT_CART_STATE,
  action = {} as AnyAction
) => {
  if (addCartItemMatcher.match(action)) {
    return { ...state, ...action.payload };
  }
  if (cartTotalMatcher.match(action)) {
    return { ...state, totalItems: action.payload };
  }
  if (addItemQuantityMatcher.match(action)) {
    return { ...state, ...action.payload };
  }
  if (subtractItemQuantityMatcher.match(action)) {
    return { ...state, ...action.payload };
  }
  if (removeItemMatcher.match(action)) {
    return { ...state, ...action.payload };
  }
  if (cartDropDownWindowToggelMatcher.match(action)) {
    return { ...state, cartDropdownOpen: action.payload };
  }
  return state;
};
