import React, { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import {
  CartIconContainer,
  ShoppingIcon,
  ItemCount,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
  const { cartState, setCartState, totalItems, toggelCartDropdown } =
    useContext(CartContext);

  const toggleCart = () => toggelCartDropdown();
  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon />
      <ItemCount as="span">{totalItems}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
