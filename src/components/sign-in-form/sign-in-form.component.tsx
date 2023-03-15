import { useState, Fragment, FormEvent, ChangeEvent, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { AuthError, AuthErrorCodes } from "firebase/auth";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.actions";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { ButtonContainer, H2, SignInContainer } from "./sign-in-form.styles";

const defualtFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defualtFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();

  const handleLogIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) return;

    try {
      dispatch(emailSignInStart(email, password));
      clearFields();
    } catch (error) {
      switch ((error as AuthError).code) {
        case AuthErrorCodes.INVALID_PASSWORD:
          alert("Wrong email or password");
          break;
        case AuthErrorCodes.USER_DELETED:
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

  const loginGoogleUser = async (event: MouseEvent) => {
    event.preventDefault();
    dispatch(googleSignInStart());
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
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
