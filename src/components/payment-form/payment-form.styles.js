import styled from "styled-components";

export const PaymentFormContainer = styled.div`
  height: 20rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.form`
  min-width: 50rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h2 {
    margin-bottom: 3rem;
  }

  button {
    align-self: center;
  }
`;

export const CardElementDiv = styled.div`
  margin-bottom: 3rem;
`;
