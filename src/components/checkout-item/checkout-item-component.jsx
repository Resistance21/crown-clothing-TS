import { React, useContext } from "react";

import Button from "../button/button.component";
import { CartContext } from "../../contexts/cart.context";

import {
  CheckoutItemContainer,
  Arrow,
  Image,
  ImageContainer,
  Name,
  Price,
  Quantity,
  Value,
  Remove,
} from "./checkout-item.syles.jsx";

const CheckoutItem = ({ item }) => {
  const { name, price, imageUrl, quantity } = item;
  const { changeQuant, removeItem } = useContext(CartContext);

  const removeItemHandler = () => removeItem(item);
  const addQuantHandler = () => changeQuant("add", item);
  const subtractQuantHandler = () => changeQuant("subtract", item);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <Image src={imageUrl} alt={name} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity>
        <Arrow onClick={subtractQuantHandler}>&#10094;</Arrow>
        <Value as="span">{quantity}</Value>
        <Arrow onClick={addQuantHandler}>&#10095;</Arrow>
      </Quantity>
      <Price>{quantity * price}</Price>
      <Remove onClick={removeItemHandler}>&#10005;</Remove>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
