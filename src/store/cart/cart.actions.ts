import { CART_ACTION_TYPES, cartItem, cartStateCount } from "./cart.type";
import {
  createAction,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";

export type CartAddItem = ActionWithPayload<
  CART_ACTION_TYPES.CART_ADD_ITEM,
  cartStateCount
>;
export type CartCalculateTotal = ActionWithPayload<
  CART_ACTION_TYPES.CART_CALCULATE_TOTAL,
  number
>;
export type CartAddQuantity = ActionWithPayload<
  CART_ACTION_TYPES.CART_ADD_QUANTITY,
  cartStateCount
>;
export type CartSubtractQuantity = ActionWithPayload<
  CART_ACTION_TYPES.CART_SUBTRACT_QUANTITY,
  cartStateCount
>;
export type CartRemoveItem = ActionWithPayload<
  CART_ACTION_TYPES.CART_REMOVE_ITEM,
  cartStateCount
>;
export type CartDropdownToggle = ActionWithPayload<
  CART_ACTION_TYPES.CART_DROPDOWN_TOGGLE,
  boolean
>;

const itemCheck = (cartItems: cartItem[], productToAdd: cartItem) => {
  console.log("add item");
  console.log(cartItems, productToAdd);
  const foundItem = cartItems.find((item: cartItem) => {
    return item.id === productToAdd.id;
  });

  if (foundItem) {
    const index = cartItems.findIndex((item) => item.id === productToAdd.id);
    cartItems[index].quantity = cartItems[index].quantity + 1;
    const newCartItems = new Array(...cartItems);
    return newCartItems;
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const calculateTotalItems = (cartItems: cartItem[]) => {
  const startingTotal = 0;
  const totalItems = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, startingTotal);
  return totalItems;
};

const addQuantity = (cartItems: cartItem[], product: cartItem) => {
  return cartItems.map((item) => {
    if (item.name === product.name) {
      item.quantity += 1;
      return item;
    } else {
      return item;
    }
  });
};

const subtractQuantity = (
  cartItems: cartItem[],
  product: cartItem
): cartItem[] => {
  if (product && product.quantity <= 1) {
    return cartItems.filter((item) => item.name !== product.name);
  }
  return cartItems.map((item) => {
    if (item.name === product.name) {
      item.quantity--;
      return item;
    } else {
      return item;
    }
  });
};

const deleteProduct = (
  cartItems: cartItem[],
  product: cartItem
): cartItem[] => {
  return cartItems.filter((item) => item.name !== product.name);
};

const changeQuant = (
  cartItems: cartItem[],
  product: cartItem,
  operation: string
): cartStateCount => {
  let itemCart: cartItem[] = [];

  if (operation === "add") {
    itemCart = addQuantity(cartItems, product);
  }
  if (operation === "subtract") {
    itemCart = subtractQuantity(cartItems, product);
  }

  return updateCartState(itemCart);
};

const updateCartState = (cartItems: cartItem[]) => {
  const totalItems = calculateTotalItems(cartItems);
  const totalCost = cartItems.reduce(
    (total, item: cartItem) => total + item.quantity * item.price,
    0
  );

  return {
    cartItems: cartItems,
    totalItems,
    totalCost,
  };
};

export const addCartItem = (cartItems: cartItem[], product: cartItem) => {
  const payload = updateCartState(itemCheck(cartItems, product));
  return addCartItemMatcher(payload);
};

export const addCartItemMatcher = withMatcher(
  (cartState: cartStateCount): CartAddItem => {
    return createAction(CART_ACTION_TYPES.CART_ADD_ITEM, cartState);
  }
);

export const cartTotalMatcher = withMatcher(
  (cartTotal: number): CartCalculateTotal => {
    return createAction(CART_ACTION_TYPES.CART_CALCULATE_TOTAL, cartTotal);
  }
);
export const cartTotal = (cartItems: cartItem[]) => {
  const cartTotal = calculateTotalItems(cartItems);
  return cartTotalMatcher(cartTotal);
};

export const addItemQuantityMatcher = withMatcher(
  (cartState: cartStateCount): CartAddQuantity => {
    return createAction(CART_ACTION_TYPES.CART_ADD_QUANTITY, cartState);
  }
);
export const addItemQuantity = (
  cartItems: cartItem[],
  product: cartItem,
  operation: string
): CartAddQuantity => {
  const payload = changeQuant(cartItems, product, operation);
  return addItemQuantityMatcher(payload);
};

export const subtractItemQuantityMatcher = withMatcher(
  (cartState: cartStateCount): CartSubtractQuantity => {
    return createAction(CART_ACTION_TYPES.CART_SUBTRACT_QUANTITY, cartState);
  }
);

export const subtractItemQuantity = (
  cartItems: cartItem[],
  product: cartItem,
  operation: string
): CartSubtractQuantity => {
  return subtractItemQuantityMatcher(
    changeQuant(cartItems, product, operation)
  );
};

export const removeItemMatcher = withMatcher(
  (cartState: cartStateCount): CartRemoveItem => {
    return createAction(CART_ACTION_TYPES.CART_REMOVE_ITEM, cartState);
  }
);

export const removeItem = (cartItems: cartItem[], product: cartItem) => {
  return removeItemMatcher(updateCartState(deleteProduct(cartItems, product)));
};

export const cartDropDownWindowToggelMatcher = withMatcher(
  (boolean: boolean) => {
    return createAction(CART_ACTION_TYPES.CART_DROPDOWN_TOGGLE, !boolean);
  }
);
export const cartDropDownWindowToggel = (boolean: boolean) => {
  return cartDropDownWindowToggelMatcher(boolean);
};
