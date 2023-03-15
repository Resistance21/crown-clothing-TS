import { useSelector, useDispatch } from "react-redux";
import { cartItem } from "../../store/cart/cart.type";

import {
  addItemQuantity,
  subtractItemQuantity,
  removeItem,
} from "../../store/cart/cart.actions";
import { selectCartItems } from "../../store/cart/cart.selectors";

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
} from "./checkout-item.syles";

type CheckoutItemProps = {
  item: cartItem;
};

const CheckoutItem = ({ item }: CheckoutItemProps) => {
  const { name, price, imageUrl, quantity } = item;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const removeItemHandler = () => dispatch(removeItem(cartItems, item));
  const addQuantHandler = () =>
    dispatch(addItemQuantity(cartItems, item, "add"));
  const subtractQuantHandler = () =>
    dispatch(subtractItemQuantity(cartItems, item, "subtract"));

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
