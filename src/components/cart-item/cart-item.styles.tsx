import styled from "styled-components";

export const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 8rem;
  margin-bottom: 15px;
`;

export const CartItemImg = styled.img`
  width: 30%;
  object-fit: cover;
`;
export const ItemDetails = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem 2rem;
`;
export const ItemDetailsName = styled.div`
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

export const ItemDetailsPrice = styled.div`
  font-size: 1.3rem;
`;
