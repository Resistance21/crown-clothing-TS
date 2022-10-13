import styled from "styled-components";

import { ReactComponent as shoppingIconSvg } from "../../assests/shopping-bag.svg";

export const CartIconContainer = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ShoppingIcon = styled(shoppingIconSvg)`
  width: 2.4rem;
  height: 2.4rem;
`;

export const ItemCount = styled.div`
  position: absolute;
  font-size: 1rem;
  font-weight: bold;
  bottom: 1.2rem;
`;
