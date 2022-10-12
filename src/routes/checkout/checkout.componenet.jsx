import { React, useContext } from "react";

import CheckoutItem from "../../components/checkout-item/checkout-item-component";
import { CartContext } from "../../contexts/cart.context";

import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, totalCost } = useContext(CartContext);

  return (
    <div>
      <div className="checkout-container">
        <div className="checkout-header">
          <div className="header-block">
            <span>Product</span>
          </div>
          <div className="header-block">
            <span>Description</span>
          </div>
          <div className="header-block">
            <span>Quantity</span>
          </div>
          <div className="header-block">
            <span>Price</span>
          </div>
          <div className="header-block">
            <span>Remove</span>
          </div>
        </div>
        {cartItems.map((item) => (
          <CheckoutItem item={item} key={item.id} />
        ))}
        <span className="total">Total: ${totalCost}</span>
      </div>
    </div>
  );
};

export default Checkout;
