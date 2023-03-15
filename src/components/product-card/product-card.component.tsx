import { useDispatch, useSelector } from "react-redux";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
//import { CartContext, CART_ACTION_TYPES } from "../../contexts/cart.context";
import { addCartItem } from "../../store/cart/cart.actions";
import { selectCartItems } from "../../store/cart/cart.selectors";

import {
  Footer,
  Image,
  Name,
  Price,
  ProductCardContainer,
} from "./product-card.styles";
import { CategoryItem } from "../../store/categories/categories.type";

type ProductProps = {
  product: CategoryItem;
};

const ProductCard = ({ product }: ProductProps) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { imageUrl, price, name } = product;

  const addProductToCart = () =>
    dispatch(addCartItem(cartItems, { quantity: 1, ...product }));
  return (
    <ProductCardContainer>
      <Image src={imageUrl} alt={name} />
      <Footer>
        <Name as="span">{name}</Name>
        <Price as="span">{price}</Price>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.base} onClick={addProductToCart}>
        Add to Cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
