import { useState, Fragment, useContext } from "react";
import { useDispatch } from "react-redux";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.actions";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  ButtonContainer,
  H2,
  SignInContainer,
} from "./sign-in-form.styles.jsx";

const defualtFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defualtFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();

  const handleLogIn = async (event) => {
    event.preventDefault();
    if (!email || !password) return;

    try {
      dispatch(emailSignInStart(email, password));
      clearFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Wrong email or password");
          break;
        case "auth/user-not-found":
          alert("Email or password not found");
          break;
        default:
          console.log(error);
      }
    }
  };

  const clearFields = () => {
    setFormFields(defualtFormFields);
  };

  const loginGoogleUser = async (event) => {
    event.preventDefault();
    dispatch(googleSignInStart());
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <Fragment>
      <SignInContainer>
        <H2>I already have an account</H2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleLogIn}>
          <FormInput
            label={"Email"}
            type="email"
            changeHandler={onChange}
            name="email"
            value={email}
          />
          <FormInput
            label={"Password"}
            type="password"
            changeHandler={onChange}
            name="password"
            value={password}
          />
          <ButtonContainer>
            <Button type="submit">Sign In</Button>
            <Button
              type="button"
              onClick={loginGoogleUser}
              buttonType={BUTTON_TYPE_CLASSES.google}
            >
              Google Sign in
            </Button>
          </ButtonContainer>
        </form>
      </SignInContainer>
    </Fragment>
  );
};

export default SignInForm;
