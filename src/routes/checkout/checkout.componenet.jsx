import { React, useContext } from "react";

import CheckoutItem from "../../components/checkout-item/checkout-item-component";
import { CartContext } from "../../contexts/cart.context";

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles.jsx";

const Checkout = () => {
  const { cartItems, totalCost } = useContext(CartContext);

  return (
    <div>
      <CheckoutContainer>
        <CheckoutHeader>
          <HeaderBlock>
            <span>Product</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Description</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Quantity</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Price</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Remove</span>
          </HeaderBlock>
        </CheckoutHeader>
        {cartItems.map((item) => (
          <CheckoutItem item={item} key={item.id} />
        ))}
        <Total as="span">Total: ${totalCost}</Total>
      </CheckoutContainer>
    </div>
  );
};

export default Checkout;
