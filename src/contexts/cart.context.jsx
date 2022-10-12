import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  cartItems: [],
  totalItems: 0,
});

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
  const [cartState, setCartState] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(itemCheck(cartItems, productToAdd));
  };

  const changeQuant = (operation, product) => {
    console.log("change");
    if (operation === "add") {
      console.log("add");
      setCartItems(addQuantity(cartItems, product));
      return;
    }
    if (operation === "subtract") {
      console.log("sub");
      setCartItems(subtractQuantity(cartItems, product));
      return;
    }
  };

  const removeItem = (product) => {
    setCartItems(deleteProduct(cartItems, product));
  };

  useEffect(() => {
    setTotalItems(calculateTotalItems(cartItems));
  }, [cartItems]);

  useEffect(() => {
    setTotalCost(
      cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
    );
  }, [cartItems]);

  const value = {
    cartState,
    setCartState,
    cartItems,
    addItemToCart,
    totalItems,
    changeQuant,
    removeItem,
    totalCost,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
