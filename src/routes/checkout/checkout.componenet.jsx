import { React, useContext } from "react";
import { useSelector } from "react-redux";

import CheckoutItem from "../../components/checkout-item/checkout-item-component";
import { CartContext } from "../../contexts/cart.context";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selectors";

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles.jsx";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const totalCost = useSelector(selectCartTotal);

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
