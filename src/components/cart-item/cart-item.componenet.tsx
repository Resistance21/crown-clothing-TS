import React from "react";

import {
  CartItemContainer,
  CartItemImg,
  ItemDetails,
  ItemDetailsName,
  ItemDetailsPrice,
} from "./cart-item.styles";

type cartProps = {
  cartItem: cartItem;
};

type cartItem = {
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
};

const CartItem = ({ cartItem }: cartProps) => {
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
