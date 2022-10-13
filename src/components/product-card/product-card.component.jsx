import { React, useContext } from "react";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { CartContext } from "../../contexts/cart.context";

import {
  Footer,
  Image,
  Name,
  Price,
  ProductCardContainer,
} from "./product-card.styles.jsx";

const ProductCard = ({ product }) => {
  const { imageUrl, price, name } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);
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
