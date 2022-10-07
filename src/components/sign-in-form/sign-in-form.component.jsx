import { useState, Fragment, useContext } from "react";

import {
  signInUserWithEmailAndPassword,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.js";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss";

const defualtFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defualtFormFields);
  const { email, password } = formFields;

  const handleLogIn = async (event) => {
    event.preventDefault();
    if (!email || !password) return;

    try {
      console.log(email, password);
      await signInUserWithEmailAndPassword(email, password);
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
    await signInWithGooglePopup();
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <Fragment>
      <div className="sign-in-container">
        <h2>I already have an account</h2>
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
          <div className="buttons-container">
            <Button type="submit">Sign In</Button>
            <Button
              type="button"
              onClick={loginGoogleUser}
              buttonType={"google"}
            >
              Google Sign in
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default SignInForm;
