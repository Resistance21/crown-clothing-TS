import { CART_ACTION_TYPES } from "./cart.type";

const INITIAL_STATE = {
  cartItems: [],
  totalItems: 0,
  totalCost: 0,
  totalItemCount: 0,
  cartDropdownOpen: false,
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.CART_ADD_ITEM:
      console.log("in add", payload);
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.CART_ADD_QUANTITY:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.CART_SUBTRACT_QUANTITY:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.CART_REMOVE_ITEM:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.CART_DROPDOWN_TOGGLE:
      return {
        ...state,
        cartDropdownOpen: payload,
      };
    default:
      return state;
  }
};
