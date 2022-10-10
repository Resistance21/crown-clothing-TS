import React, { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assests/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { cartState, setCartState } = useContext(CartContext);

  const toggleCart = () => setCartState(!cartState);
  return (
    <div className="cart-icon-container" onClick={toggleCart}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};

export default CartIcon;
