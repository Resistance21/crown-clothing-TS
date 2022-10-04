import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.js";

import SignUp from "../../components/sign-up-form/sign-up-form.component";

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
      <SignUp />
    </div>
  );
};

export default SignIn;
