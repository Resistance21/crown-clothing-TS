export enum CART_ACTION_TYPES {
  CART_ADD_ITEM = "CART_ADD_ITEM",
  CART_CALCULATE_TOTAL = "CART_CALCULATE_TOTAL",
  CART_ADD_QUANTITY = "CART_ADD_QUANTITY",
  CART_SUBTRACT_QUANTITY = "CART_SUBTRACT_QUANTITY",
  CART_REMOVE_ITEM = "CART_REMOVE_ITEM",
  CART_DROPDOWN_TOGGLE = "CART_DROPDOWN_TOGGLE",
}

export type cartItem = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
};

export type cartStateCount = {
  cartItems: cartItem[];
  totalItems: number;
  totalCost: number;
};
