import { useSelector } from "react-redux";

import CheckoutItem from "../../components/checkout-item/checkout-item-component";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selectors";

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles";

import PaymentForm from "../../components/payment-form/payment-form.component";

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
        <PaymentForm />
      </CheckoutContainer>
    </div>
  );
};

export default Checkout;
