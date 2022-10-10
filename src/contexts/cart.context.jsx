import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartState, setCartState] = useState(true);
  const value = {
    cartState,
    setCartState,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
