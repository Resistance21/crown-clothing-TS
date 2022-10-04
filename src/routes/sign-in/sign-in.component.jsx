import React from "react";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.js";

const SignIn = () => {
  const logGoogleUser = async () => {
    const res = await signInWithGooglePopup();
    console.log(res);
    const userDocRef = await createUserDocumentFromAuth(res.user);
  };
  return (
    <div>
      <h1>Sign In</h1>

      <button onClick={logGoogleUser}> Sign in</button>
    </div>
  );
};

export default SignIn;
