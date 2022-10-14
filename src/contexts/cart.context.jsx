import { createContext, useEffect, useReducer } from "react";
import { act } from "react-dom/test-utils";

export const CartContext = createContext({
  cartItems: [],
  totalItems: 0,
  totalCost: 0,
  totalItemCount: 0,
  cartDropdownOpen: false,
});

export const CART_ACTION_TYPES = {
  CART_ADD_ITEM: "CART_ADD_ITEM",
  CART_CALCULATE_TOTAL: "CART_CALCULATE_TOTAL",
  CART_ADD_QUANTITY: "CART_ADD_QUANTITY",
  CART_SUBTRACT_QUANTITY: "CART_SUBTRACT_QUANTITY",
  CART_REMOVE_ITEM: "CART_REMOVE_ITEM",
  CART_DROPDOWN_TOGGLE: "CART_DROPDOWN_TOGGLE",
};

const INITIAL_STATE = {
  cartItems: [],
  totalItems: 0,
  totalCost: 0,
  totalItemCount: 0,
  cartDropdownOpen: false,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  console.log(payload);

  switch (type) {
    case CART_ACTION_TYPES.CART_ADD_ITEM:
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
        ...payload,
      };
    default:
      console.log("cart defualt");
  }
};

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

export const CartProvider = ({ children }) => {
  // const [cartState, setCartState] = useState(false);
  //const [cartItems, setCart] = useState([]);
  //const [totalItems, setTotalItems] = useState(0);
  //const [totalCost, setTotalCost] = useState(0);
  const [{ cartItems, totalItems, totalCost, cartDropdownOpen }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const setCart = (action, payload) => {
    dispatch({ type: action, payload: payload });
  };

  const toggelCartDropdown = () => {
    const payload = { cartDropdownOpen: !cartDropdownOpen };
    setCart(CART_ACTION_TYPES.CART_DROPDOWN_TOGGLE, payload);
  };

  const updateCartState = (cartItem, action) => {
    const totalItems = calculateTotalItems(cartItem);
    const totalCost = cartItem.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    const payload = {
      cartItems: cartItem,
      totalItems,
      totalCost,
    };

    setCart(action, payload);
  };

  const addItemToCart = (productToAdd) => {
    const itemCart = itemCheck(cartItems, productToAdd);

    updateCartState(itemCart, CART_ACTION_TYPES.CART_ADD_ITEM);
  };

  const changeQuant = (operation, product) => {
    let itemCart;

    if (operation === "add") {
      itemCart = addQuantity(cartItems, product);
    }
    if (operation === "subtract") {
      itemCart = subtractQuantity(cartItems, product);
    }
    updateCartState(
      itemCart,
      operation === "add"
        ? CART_ACTION_TYPES.CART_ADD_QUANTITY
        : CART_ACTION_TYPES.CART_SUBTRACT_QUANTITY
    );
  };

  const removeItem = (product) => {
    const newCart = deleteProduct(cartItems, product);
    updateCartState(newCart, CART_ACTION_TYPES.CART_REMOVE_ITEM);
  };

  /* useEffect(() => {
    //setTotalItems(calculateTotalItems(cartItems));
    console.log(cartItems);
  }, [cartItems]); */

  /* useEffect(() => {
    setTotalCost(
      cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
    );
  }, [cartItems]); */

  const value = {
    //cartState,
    //setCartState,
    cartItems,
    addItemToCart,
    totalItems,
    changeQuant,
    removeItem,
    totalCost,
    toggelCartDropdown,
    cartDropdownOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
