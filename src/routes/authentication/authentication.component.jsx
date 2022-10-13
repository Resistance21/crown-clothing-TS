import { Fragment } from "react";

import SignUp from "../../components/sign-up-form/sign-up-form.component";
import SignIn from "../../components/sign-in-form/sign-in-form.component";

import { AuthernticationContainer } from "./authentication.styles.jsx";

const Authentication = () => {
  return (
    <AuthernticationContainer>
      <SignIn />
      <SignUp />
    </AuthernticationContainer>
  );
};

export default Authentication;
