import React from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { selectCartItems } from "../../store/cart/cart.selectors.js";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import CartItem from "../cart-item/cart-item.componenet";

import {
  CartDropdownWindow,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };
  return (
    <CartDropdownWindow>
      <CartItems>
        {cartItems.length > 0 ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage as="span">No Items</EmptyMessage>
        )}
      </CartItems>

      <Button
        buttonType={BUTTON_TYPE_CLASSES.base}
        onClick={goToCheckoutHandler}
      >
        to Checkout
      </Button>
    </CartDropdownWindow>
  );
};

export default CartDropdown;
