import { React, useContext } from "react";

import Button from "../button/button.component";
import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.syles.scss";

const CheckoutItem = ({ item }) => {
  const { name, price, imageUrl, quantity } = item;
  const { changeQuant, removeItem } = useContext(CartContext);

  const removeItemHandler = () => removeItem(item);
  const addQuantHandler = () => changeQuant("add", item);
  const subtractQuantHandler = () => changeQuant("subtract", item);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="name">{name}</div>
      <div className="quantity">
        <div className="arrow" onClick={subtractQuantHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addQuantHandler}>
          &#10095;
        </div>
      </div>
      <div className="price">{quantity * price}</div>
      <div className="remove-button" onClick={removeItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
