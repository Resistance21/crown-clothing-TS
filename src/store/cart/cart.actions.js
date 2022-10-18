import { CART_ACTION_TYPES } from "./cart.type.js";
import { createAction } from "../../utils/reducer/reducer.utils";

const itemCheck = (cartItems, productToAdd) => {
  const foundItem = cartItems.find((item) => {
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

const calculateTotalItems = (cartItems) => {
  const startingTotal = 0;
  const totalItems = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, startingTotal);
  return totalItems;
};

const addQuantity = (cartItems, product) => {
  return cartItems.map((item) => {
    if (item.name === product.name) {
      item.quantity += 1;
      return item;
    } else {
      return item;
    }
  });
};

const subtractQuantity = (cartItems, product) => {
  if (product.quantity <= 1) {
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

const deleteProduct = (cartItems, product) => {
  return cartItems.filter((item) => item.name !== product.name);
};

const changeQuant = (cartItems, product, operation) => {
  let itemCart;

  if (operation === "add") {
    itemCart = addQuantity(cartItems, product);
  }
  if (operation === "subtract") {
    itemCart = subtractQuantity(cartItems, product);
  }

  return updateCartState(itemCart);
};

const updateCartState = (cartItem) => {
  const totalItems = calculateTotalItems(cartItem);
  const totalCost = cartItem.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return {
    cartItems: cartItem,
    totalItems,
    totalCost,
  };
};

export const addCartItem = (cartItems, product) => {
  const payload = updateCartState(itemCheck(cartItems, product));
  return createAction(CART_ACTION_TYPES.CART_ADD_ITEM, payload);
};

export const cartTotal = (cartItems) => {
  const payload = calculateTotalItems(cartItems);
  return createAction(CART_ACTION_TYPES.CART_CALCULATE_TOTAL, payload);
};

export const addItemQuantity = (cartItems, product, operation) => {
  return createAction(
    CART_ACTION_TYPES.CART_ADD_QUANTITY,
    changeQuant(cartItems, product, operation)
  );
};

export const subtractItemQuantity = (cartItems, product, operation) => {
  return createAction(
    CART_ACTION_TYPES.CART_SUBTRACT_QUANTITY,
    changeQuant(cartItems, product, operation)
  );
};

export const removeItem = (cartItems, product) => {
  //const payload = deleteProduct(cartItems, product);
  return createAction(
    CART_ACTION_TYPES.CART_REMOVE_ITEM,
    updateCartState(deleteProduct(cartItems, product))
  );
};

export const cartDropDownWindowToggel = (boolean) => {
  return createAction(CART_ACTION_TYPES.CART_DROPDOWN_TOGGLE, !boolean);
};
