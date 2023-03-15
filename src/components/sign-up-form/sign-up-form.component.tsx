import { useState, Fragment, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { AuthError, AuthErrorCodes } from "firebase/auth";

import { signUpUser } from "../../store/user/user.actions";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { SignUpContainer, H2 } from "./sign-up-form.styles";

const defualtFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defualtFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return;
    }

    try {
      dispatch(signUpUser(email, password, displayName));

      clearFields();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert("Email already exsists");
      } else {
        console.log(error);
      }
    }
  };

  const clearFields = () => {
    setFormFields(defualtFormFields);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <Fragment>
      <SignUpContainer>
        <H2>Dont have an account?</H2>
        <span>Sign up with Email and Password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label={"Display Name"}
            type="text"
            changeHandler={onChange}
            name="displayName"
            value={displayName}
          />
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
          <FormInput
            label={"Confirm Password"}
            type="password"
            changeHandler={onChange}
            name="confirmPassword"
            value={confirmPassword}
          />
          <Button type="submit">Sign Up</Button>
        </form>
      </SignUpContainer>
    </Fragment>
  );
};

export default SignUpForm;
