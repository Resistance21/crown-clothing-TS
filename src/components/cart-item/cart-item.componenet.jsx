import React from "react";

import {
  CartItemContainer,
  CartItemImg,
  ItemDetails,
  ItemDetailsName,
  ItemDetailsPrice,
} from "./cart-item.styles.jsx";

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  return (
    <CartItemContainer>
      <CartItemImg src={imageUrl} alt={name} />
      <ItemDetails>
        <ItemDetailsName as="span">{name}</ItemDetailsName>
        <ItemDetailsPrice as="span">
          {quantity} x ${price}
        </ItemDetailsPrice>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
