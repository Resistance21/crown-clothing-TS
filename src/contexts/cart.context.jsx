import { createContext, useState } from "react";

export const CartContext = createContext({
  cartItems: [],
});

const itemCheck = (cartItems, productToAdd) => {
  //console.log(cartItems);

  const foundItem = cartItems.find((item) => {
    return item.id === productToAdd.id;
  });

  if (foundItem) {
    const index = cartItems.findIndex((item) => item.id === productToAdd.id);
    cartItems[index].quantity = cartItems[index].quantity + 1;
    const newCartItems = new Array(...cartItems);
    //console.log("adding more quant");
    return newCartItems;
  }
  //console.log("new item");
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartProvider = ({ children }) => {
  const [cartState, setCartState] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    setCartItems(itemCheck(cartItems, productToAdd));
  };

  const value = {
    cartState,
    setCartState,
    cartItems,
    addItemToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
