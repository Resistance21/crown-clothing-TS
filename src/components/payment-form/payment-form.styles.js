import styled from "styled-components";

export const PaymentFormContainer = styled.div`
  height: 30rem;

  display: flex;
  flex-direction: column;
`;

export const FormContainer = styled.form`
  min-width: 50rem;
  display: flex;
  flex-direction: column;

  * {
    margin-bottom: 3rem;
  }

  button {
    align-self: center;
  }
`;
