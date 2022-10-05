import { useState, Fragment } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.js";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-up-form.styles.scss";

const defualtFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defualtFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      const userAuth = {
        displayName,
        email,
        uid: user.uid,
      };
      const userDocRef = await createUserDocumentFromAuth(userAuth);
      clearFields();
    } catch (error) {
      console.log(error);
    }
  };

  const clearFields = () => {
    setFormFields(defualtFormFields);
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <Fragment>
      <div className="sign-up-container">
        <h2>Dont have an account?</h2>
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
      </div>
    </Fragment>
  );
};

export default SignUpForm;
