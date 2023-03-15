import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { cartDropDownWindowToggel } from "../../store/cart/cart.actions";
import {
  selectCartTotalItems,
  selectCartDropDownWindow,
} from "../../store/cart/cart.selectors";

import { CartIconContainer, ShoppingIcon, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {
  const dispatch = useDispatch();
  const totalItems = useSelector(selectCartTotalItems);
  const dropDownWindowToggel = useSelector(selectCartDropDownWindow);

  const toggleCart = () =>
    dispatch(cartDropDownWindowToggel(dropDownWindowToggel));
  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon />
      <ItemCount as="span">{totalItems}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
